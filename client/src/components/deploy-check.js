import React from 'react'
import styles from '../App.module.scss'
import Instructions from './Instructions/index'

export default _props =>
  (
    <div className={styles.setup}>
      <div className={styles.notice}>
        Your contracts are <b>not deployed</b> in this network. Two potential reasons: <br />
        <p>
          <b>1) Maybe you are in the wrong network?</b><br />
          Point Metamask to localhost!<br /><br />
          <b>2) You contract is not yet deployed.</b><br />
          Follow the instructions below!
        </p>
      </div>
      <Instructions
        name={_props.name}
        accounts={_props.accounts}
        ganacheAccounts={_props.ganacheAccounts}
      />
    </div>
  )
