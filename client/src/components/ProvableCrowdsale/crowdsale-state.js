import {
  convertWeiToEth,
  convertCentsToDollars,
} from '../../utils/utils'
import React from 'react'
import styles from './Crowdsale.module.scss'
import { PublicAddress } from "rimble-ui"

export default _props =>
  <div className={styles.stateWrapper} >

    <div className={styles.crowdsaleState}>
      <h3>Contract State:</h3>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          Total Eth Raised: <b>{
            `${convertWeiToEth(_props.totalWeiRaised, _props.web3)}`.slice(0, 7)
          } Ξ</b>
        </div>
      </div>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          Price per token: <b>{
            `${convertWeiToEth(_props.pricePerTokenInWei, _props.web3)}`.slice(0, 7)
          } Ξ</b>
        </div>
      </div>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          Crowdsale Initialized: <b>{
            _props.crowdsaleInitialized ? 'Yes!' : 'No!'
          }</b>
        </div>
      </div>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          Eth Price In Contract: <b>${
            convertCentsToDollars(_props.ethPriceInCents)
          }</b>
        </div>
      </div>
    </div>


    <div className={styles.crowdsaleState}>
      <h3>Contract Addresses:</h3>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          <PublicAddress label='Owner Address:' address={_props.owner} />
        </div>
      </div>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          <PublicAddress label='Crowdsale Address:' address={_props.crowdsaleContract._address} />
        </div>
      </div>

      <div className={styles.datapoint}>
        <div className={styles.label}>
          <PublicAddress label='Simple Token Address:' address={_props.tokenAddress} />
        </div>
      </div>
    </div>
  </div>
