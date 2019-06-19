import React from 'react'
import renderFAQ from './faq'
import Hero from "../Hero/index.js"
import renderSetup from './setup-instructions'
import styles from './Instructions.module.scss'
import renderMetamask from './metamask-instructions'
import renderEVMInstructions from './evm-instructions'
import renderProvableInstructions from './provable-instructions'

export default _props =>
  (
    <div className={styles.wrapper}>
      <Hero />
      {
        _props.name === 'provable'
          ? renderProvableInstructions(_props)
          : _props.name === 'evm'
          ? renderEVMInstructions(_props)
          : _props.name === 'faq'
          ? renderFAQ(_props)
          : _props.name === 'metamask'
          ? renderMetamask(_props)
          : renderSetup(_props)
      }
    </div>
  )
