import React from 'react'
import Hero from "./Hero/index.js"
import styles from '../App.module.scss'
import Instructions from './Instructions/index'

export default _props =>
  (
    <div className={styles.wrapper}>
      <Hero />
      <Instructions
        name="faq"
        accounts={_props.accounts}
        ganacheAccounts={_props.ganacheAccounts}
      />
    </div>
  )
