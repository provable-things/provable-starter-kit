import React from 'react'
import { Loader } from 'rimble-ui'
import styles from '../../App.module.scss'

export default _ =>
  <div className={styles.loader}>
    <Loader size="80px" color="red" />
    <h3> Loading Web3, accounts, and contract...</h3>
    <p> Unlock your metamask </p>
  </div>
