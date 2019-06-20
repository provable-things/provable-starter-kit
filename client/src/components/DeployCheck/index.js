import React from 'react'
import styles from '../../App.module.scss'
import Instructions from '../Instructions/index'

export default ({ accounts, routeName, ganacheAccounts }) =>
  <div className={styles.setup}>
    <div className={styles.notice}>
      Your crowdsale contract is <b>not deployed</b> in this network. Two potential reasons: <br />
      <p>
        <b>1) Maybe you are in the wrong network?</b><br />
        Point Metamask to localhost!<br /><br />
        <b>2) You haven't deployed it yet?</b><br />
        Follow the instructions below!
      </p>
    </div>
    <Instructions
      accounts={accounts}
      routeName={routeName}
      ganacheAccounts={ganacheAccounts}
    />
  </div>
