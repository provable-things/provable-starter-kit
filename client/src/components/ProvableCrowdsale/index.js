import {
  getGanacheAccounts,
  getContractInstance
} from '../../utils/utils'

import {
  getGanacheWeb3,
  getNetworkIdFromWeb3,
} from '../../utils/web3-utils'

import React from 'react'
import CrowdsaleDapp from './crowdsale-dapp'
import StyledLoader from '../StyledLoader/index'
import Instructions from '../Instructions/index'
import styles from '../../App.module.scss'

export default class Provable extends React.Component {

  state = {
    web3: undefined,
    crowdsaleContract: null,
  }

  pollForWeb3 = _ =>
    getNetworkIdFromWeb3(getGanacheWeb3())
      .then(_web3 =>
        !_web3
          ? Promise.reject()
          : Promise.all([
            _web3,
            getGanacheAccounts(),
            _web3.eth.net.getId(),
            _web3.eth.getAccounts(),
          ])
      )
      .then(([ web3, accounts, networkId, ganacheAccounts ]) => {
        this.setState({ web3, accounts, networkId, ganacheAccounts })
      })
      .catch(_ => {
        this.setState({ web3: null })
        this.resetWeb3Poll()
      })

  checkForCrowdsaleContract = _ =>
    Promise.resolve(
      getContractInstance(
        require('../../../../build/contracts/ProvableZeppelinCrowdsale.json'),
        this.state.networkId,
        this.state.web3
      )
    )
      .then(crowdsaleContract =>
        !crowdsaleContract
          ? Promise.reject()
          : this.setState({ crowdsaleContract })
      )
      .catch(_e => console.error(_e))

  resetTimeoutInState = (_oldTimeout, _fxn, _key) => {
    _oldTimeout && clearTimeout(_oldTimeout)
    this.setState({ [_key]: setTimeout(_fxn, 2000) })
  }

  resetWeb3Poll = _ =>
    this.resetTimeoutInState(
      this.state.web3PollTimeout,
      this.pollForWeb3,
      'web3PollTimeout'
    )

  componentWillMount = _ =>
    this.pollForWeb3()
      .then(_ => this.checkForCrowdsaleContract())

  componentWillUnmount = _ =>
    this.state.web3PollTimeout &&
    clearTimeout(this.state.web3PollTimeout)

  render = _ =>
    <div className={styles.wrapper}>
      {
        this.state.web3 === undefined
        ? <StyledLoader />
        : this.state.web3 === null
        ? <Instructions instructionSet='noWeb3' />
        : this.state.crowdsaleContract === null
        ? <Instructions instructionSet='crowdsaleSetup' ganacheAccounts={this.state.ganacheAccounts} />
        : <CrowdsaleDapp  { ...this.state } />
      }
    </div>
}
