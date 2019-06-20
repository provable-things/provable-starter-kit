import {
  getGanacheAccounts,
  getContractInstance
} from '../../utils/utils'

import {
  getGanacheWeb3,
  getNetworkIdFromWeb3,
} from '../../utils/web3-utils'

import React from 'react'
import { Loader } from 'rimble-ui'
import CrowdsaleDapp from './crowdsale-dapp'
import Instructions from '../Instructions/index'

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
      .catch(_ => this.resetWeb3Poll)

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
    this.setState({ [_key]: setTimeout(_ => _fxn, 2000) })
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
    this.clearWeb3PollTimeout()

  render = _ =>
    this.state.web3 === undefined
      ? <Loader size="50px" color="blue" />
      : this.state.web3 === null
      ? <Instructions instructionSet='noWeb3' />
      : this.state.crowdsaleContract === null
      ? <Instructions instructionSet='provableCrowdsale' ganacheAccounts={this.state.ganacheAccounts} />
      : <CrowdsaleDapp />
}
