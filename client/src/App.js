import {
  getContractInstance,
  getUserBalanceInEth,
  getGanacheAddresses
} from './utils/utils'
import React from 'react'
import styles from './App.module.scss'
import { getWeb3 }  from './utils/getWeb3'
import Hero from "./components/Hero/index.js"
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import Instructions from './components/Instructions/index'
import Provable from './components/ProvableCrowdsale/index'
import { zeppelinSolidityHotLoaderOptions } from '../config/webpack'

export default class App extends React.Component {

  state = {
    web3: null,
    accounts: null,
    contract: null,
    storageValue: 0,
    route: window.location.pathname.replace('/', '')
  }

  componentDidMount = async () =>
    Promise.all([
      getWeb3(),
      getGanacheAddresses(),
      require('../../build/contracts/ProvableZeppelinCrowdsale.json')
    ])
      .then(([
        _web3,
        _ganacheAccounts,
        _crowdsaleArtifact
      ]) =>
        Promise.all([
          _web3,
          _ganacheAccounts,
          _crowdsaleArtifact,
          _web3.eth.net.getId(),
          _web3.eth.getAccounts(),
          _web3.eth.net.getNetworkType(),
          _web3.currentProvider.isMetamask
        ])
      )
      .then(async ([
          _web3,
          _ganacheAccounts,
          _crowdsaleArtifact,
          _networkId,
          _accounts,
          _networkType,
          _isMetamask
      ]) => {

        const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled

        if (process.env.NODE_ENV !== 'production') {
          const balance = _accounts.length > 0
            ? await getUserBalanceInEth(_accounts[0], _web3)
            : _web3.utils.fromWei(0, 'ether')

          const crowdsaleInstance = getContractInstance(_crowdsaleArtifact, _networkId, _web3)

          if ( crowdsaleInstance) {
            return this.setState({
              web3: _web3,
              balance: balance,
              accounts: _accounts,
              networkId: _networkId,
              isMetaMask: _isMetamask,
              networkType: _networkType,
              ganacheAccounts: _ganacheAccounts,
              hotLoaderDisabled,
              contract: crowdsaleInstance
            }, _ => {
              console.log('sadfg')
              this.updateCrowdsaleContractValuesInState(crowdsaleInstance)
                setInterval(_ =>
                  this.updateCrowdsaleContractValuesInState(crowdsaleInstance)
                , 5000)
              })
          } else {
            this.setState({
              web3: _web3,
              balance: balance,
              accounts: _accounts,
              networkId: _networkId,
              isMetaMask: _isMetamask,
              networkType: _networkType,
              ganacheAccounts: _ganacheAccounts,
              hotLoaderDisabled,
            })
          }
        }
    })

  updateCrowdsaleContractValuesInState = _crowdsaleInstance =>
    Promise.all(
      [
        'owner',
        'totalWeiRaised',
        'ethPriceInCents',
        'simpleTokenAddress',
        'pricePerTokenInWei',
        'crowdsaleInitialized'
      ].map(_value => this.getValueFromContractAndUpdateInState(_value))
    )

  getValueFromContractInState = (_value) =>
    this.state.contract.methods[_value]().call()

  getValueFromContractAndUpdateInState = (_value) =>
    this.getValueFromContractInState(_value)
     .then(_returnValue => this.setState({ [_value]: _returnValue }))

  componentWillUnmount = _ =>
    this.interval && clearInterval(this.interval)

  render = _ =>
    (
      <div className={styles.App}>
        <Header />
          { this.state.route === '' && <Hero /> }
          { this.state.route === 'setup' && <Instructions name='setup' { ... this.state } /> }
          { this.state.route === 'provable' && <Provable name='provable' {...this.state } /> }
        <Footer />
      </div>
    )
}
