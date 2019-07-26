import React from 'react';
import styles from './footer.module.scss';
import mail from './mail.svg';
import pencil from './pencil.svg';
import twitter from './twitter.svg';
import github from './github.svg';
import zeppelin from './zeppelin_logo.png';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.brand}>
      <div className={styles.created}>
        <a href="https://openzeppelin.com/" rel="noopener noreferrer" target="_blank">
          <img
            style={{width: '80px', height: 'auto', 'marginLeft': '10px'}}
            src={zeppelin} alt="Zeppelin" />
        </a>
      </div>
      <div className={styles.copyright}>
        Copyright © 2019 Provable Things & OpenZeppelin
      </div>
    </div>
    <div className={styles.links}>
      <a href="mailto:ramon@openzeppelin.com" target="_blank" rel="noopener noreferrer">
        <img src={mail} alt="email" />
      </a>
      <a href="https://docs.openzeppelin.com/starter-kits/2.3/index.html" rel="noopener noreferrer" target="_blank">
        <img src={pencil} alt="medium" />
      </a>
      <a href="https://twitter.com/ZeppelinOrg" rel="noopener noreferrer" target="_blank">
        <img src={twitter} alt="twitter" />
      </a>
      <a href="https://github.com/OpenZeppelin" rel="noopener noreferrer" target="_blank">
        <img src={github} alt="github" />
      </a>
    </div>
  </footer>
)

export default Footer;
