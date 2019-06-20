import React from 'react'
import logo from './zk_logo.svg'
import styles from './header.module.scss'

export default _ =>
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <div className={styles.brand}>
        <a href="/" className={styles.link}> <img src={logo} alt="logo" /></a>
      </div>
      <ul>
        <li><a href="/" className={styles.link}> Home</a></li>
        <li><a href="/setup" className={styles.link}> Setup</a></li>
        <li><a href="/provable" className={styles.link}>Provable Crowdsale</a></li>
      </ul>
    </nav>
  </div>
