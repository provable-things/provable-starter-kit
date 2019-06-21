import React from 'react'
import styles from './Instructions.module.scss'
import { BuyATokenButton } from '../ProvableCrowdsale/provable-crowdsale-buttons'

export default _props =>
    <div className={styles.instructions}>
      <h2> Your crowdsale contract is open for business!</h2>
      <div className={styles.step}>
        <div className={styles.instruction}>
          Alas, no one has bought any tokens yet. It's time to change that! Lets use Metamask to buy a token!
        </div>
        <BuyATokenButton
          purchaser={_props.accounts[2]}
          weiAmount={_props.pricePerTokenInWei}
          crowdsaleContract={_props.crowdsaleContract}
        />
    </div>
  </div>
