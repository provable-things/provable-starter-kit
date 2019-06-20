import {
  getGanacheAccounts,
  getUserBalanceInEth,
  getContractInstance
} from '../../utils/utils'

import {
  getWeb3,
  getGanacheWeb3,
  getNetworkIDFromWeb3
} from '../../utils/get-web3'

import { Loader } from 'rimble-ui'
import React from 'react'
import Web3Info from '../Web3Info/index'
import styles from '../../App.module.scss'
import DeployCheck from '../DeployCheck/index'
import StyledLoader from '../StyledLoader/index'
import Instructions from '../Instructions/index'
import instructionStyles from '../Instructions/Instructions.module.scss'
import { zeppelinSolidityHotLoaderOptions } from '../../../config/webpack'

export default class Provable extends React.Component {

  state = {
    web3: undefined,
    timeout: null
  }

  pollForWeb3 = _ =>
    getNetworkIDFromWeb3(getGanacheWeb3())
      .then(_web3 => _web3
        ? this.setState({ web3: _web3 })
        : Promise.reject()
      )
      .catch(_ => {
        clearTimeout()
        const timeout = setTimeout(_ => this.pollForWeb3(), 2000)
        this.setState({ timeout })
      })

  pollForContracts = _ =>
    console.log('polling now sir')

  componentWillMount = _ =>
    this.pollForWeb3()

  clearTimeout = _ =>
    clearTimeout(this.state.timeout)

  componentWillUnmount = _ =>
    this.clearTimeout()

  render = _ =>
    this.state.web3 === undefined
      ? <Loader size="50px" color="blue" />
      : this.state.web3 === null
      ? <Instructions instructionSet='noWeb3' />
      : <Instructions instructionSet='provableCrowdsale' />
}

