import React from 'react'
import styles from './Instructions.module.scss'
import { InitializeCrowdsaleButton } from '../ProvableCrowdsale/provable-crowdsale-buttons'

export default _props =>
    <div className={styles.instructions}>
      <h2>Now your contract knows the price of ETH!</h2>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Now it's time to initialize your crowdsale! This function will first calculate the price per token in Wei making is so that each token costs $1. It uses the formula:
        </div>
        <div className={styles.code}>
          <code>
            (1 ethInWei * 100 cents) / ethPriceInCents
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Then it will set this price in the contract, and finally open the crowdsale up for people to purchase tokens from it! Go ahead and make the transactions to initialize your crowdsale:
        </div>
        <InitializeCrowdsaleButton
          owner={_props.owner}
          crowdsaleContract={_props.crowdsaleContract}
        />
    </div>
  </div>
