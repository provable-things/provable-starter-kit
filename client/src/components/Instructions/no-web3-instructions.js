import React from 'react'
import styles from './Instructions.module.scss'

export default _ =>
  <div className={styles.instructions}>
    <h1> Cannot detect Web3! </h1>
    <div className={styles.step}>
      <div className={styles.instruction}>
      Make sure you're running your local development blockchain.
      </div>
      <div className={styles.code}>
        <code>
          ganache-cli --secure -u 0 -u 1 -u 2 --deterministic
        </code>
      </div>
    </div>
    <div className={styles.step}>
      <div className={styles.instruction}>
      Also, make sure to point Metamask at your local host address:
      </div>
      <div className={styles.code}>
        <code>
          http://localhost:8545
        </code>
      </div>
    </div>
  </div>
