import React from 'react'
import styles from './Instructions.module.scss'
import RenderNoWeb3Instructions from './no-web3-instructions'
import RenderProvableCrowdsaleInstructions from './provable-instructions'

export default _props =>
  <div className={styles.wrapper}>
    { _props.instructionSet === 'noWeb3' && <RenderNoWeb3Instructions  /> }
    { _props.instructionSet === 'provableCrowdsale' && <RenderProvableCrowdsaleInstructions {..._props} /> }
  </div>
