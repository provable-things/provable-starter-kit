import React from 'react'
import renderSetup from './setup-instructions'
import styles from './Instructions.module.scss'
import renderMetamask from './metamask-instructions'
import renderProvableInstructions from './provable-instructions'

export default ({ routeName })=>
  <div className={styles.wrapper}>
    {
      routeName === 'provable'
        ? renderProvableInstructions()
        : routeName === 'metamask'
        ? renderMetamask()
        : renderSetup()
    }
  </div>
