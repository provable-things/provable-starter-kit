import React from 'react'
import BuyAToken from './buy-a-token'
import GetEthPrice from './get-eth-price'
import CrowdsaleSetup from './crowdsale-setup'
import styles from './Instructions.module.scss'
import TutorialComplete from './tutorial-complete'
import Web3Instructions from './no-web3-instructions'
import InitializeCrowdsale from './initialize-crowdsale'

export default _props =>
  <div className={styles.wrapper}>
    { _props.instructionSet === 'noWeb3' && <Web3Instructions  /> }
    { _props.instructionSet === 'buyAToken' && <BuyAToken {..._props} /> }
    { _props.instructionSet === 'getEthPrice' && <GetEthPrice {..._props} /> }
    { _props.instructionSet === 'crowdsaleSetup' && <CrowdsaleSetup {..._props} /> }
    { _props.instructionSet === 'tutorialComplete' && <TutorialComplete {..._props} /> }
    { _props.instructionSet === 'initializeCrowdsale' && <InitializeCrowdsale {..._props} /> }
  </div>
