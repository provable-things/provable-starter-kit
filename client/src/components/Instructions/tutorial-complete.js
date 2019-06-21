import React from 'react'
import styles from './Instructions.module.scss'

export default _props =>
  <div className={styles.instructions}>
    <h2> Congratulations on your first token sale! </h2>
    <div className={styles.step}>
      <div className={styles.instruction}>
        Alas, it's time to part, the interactive tutorial is now complete. Now it's time for the really fun bit to begin: Start digging into the code of this repo to see how it works!
      </div>
      <div className={styles.code}>
        <code>
          Happy Developing from the Provable Team!
        </code>
      </div>
    </div>
  </div>
