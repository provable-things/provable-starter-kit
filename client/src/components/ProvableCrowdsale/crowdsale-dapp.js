import {
  getAllContractState,
  CROWDSALE_CONTRACT_VARIABLE_NAMES
} from '../../utils/utils'

import React from 'react'
import { assoc } from 'ramda'
import CrowdsaleState from './crowdsale-state'
import Instructions from '../Instructions/index'

export default class CrowdsaleDapp extends React.Component {

  state = {
    ...this.props,
    crowdsaleStatePollTimeout: null
  }

  pollForCrowdsaleState = _ =>
    getAllContractState(
      this.state.crowdsaleContract,
      CROWDSALE_CONTRACT_VARIABLE_NAMES
    )
      .then(_stateArr => this.convertCrowdsaleVariablesArrToStateObj(_stateArr))
      .then(_crowdsaleStateObj => this.setState(_crowdsaleStateObj))
      .then(_ => Promise.reject())
      .catch(_ =>
        this.resetTimeoutInState(
          this.state.crowdsaleStatePollTimeout,
          this.pollForCrowdsaleState,
          'crowdsaleStatePollTimeout'
        )
      )

  convertCrowdsaleVariablesArrToStateObj = _crowdsaleVariablesArr =>
    CROWDSALE_CONTRACT_VARIABLE_NAMES
      .reduce((_stateObj, _variableName, _i) =>
        assoc(_variableName, _crowdsaleVariablesArr[_i], _stateObj),
        {}
    )

  resetTimeoutInState = (_oldTimeout, _fxn, _key) => { // FIXME: Needs factoring out!
    _oldTimeout && clearTimeout(_oldTimeout)
    this.setState({ [_key]: setTimeout(_fxn, 2000) })
  }

  componentWillMount = _ =>
    this.pollForCrowdsaleState()

  componentWillUnmount = _ =>
    this.state.crowdsaleStatePollTimeout &&
    clearTimeout(this.state.crowdsaleStatePollTimeout)

  render = _ =>
    <React.Fragment>
      <CrowdsaleState { ...this.state }/>
      {
        this.state.ethPriceInCents === '0'
          ? <Instructions instructionSet='getEthPrice' { ...this.state }  />
          : !this.state.crowdsaleInitialized
          ? <Instructions instructionSet='initializeCrowdsale' { ...this.state }  />
          : this.state.totalWeiRaised === '0'
          ? <Instructions instructionSet='buyAToken' { ...this.state }  />
          : <Instructions instructionSet='tutorialComplete' { ...this.state }  />
      }
    </React.Fragment>
}
