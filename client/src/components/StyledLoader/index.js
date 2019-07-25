import React from 'react'
import { Loader } from 'rimble-ui'
import styles from '../../App.module.scss'

export default _ =>
  <div className={styles.loader}>
    <Loader size="80px" color="red" />
    <h3> Detecting web3 and deployed contracts...</h3>
    <p> Don't forget to unlock your metamask and point it at localhost!</p>
  </div>
