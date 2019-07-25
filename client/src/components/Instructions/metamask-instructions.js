import React from 'react'
import styles from './Instructions.module.scss'
import { getDefaultAddressFromGanacheAccounts } from '../../utils/utils.js'

const getCode = (_defaultAddress, _address) =>
    `web3.eth.sendTransaction({from: '${_defaultAddress}',to:'${_address}', value: web3.utils.toWei("0.5", "ether")}) `

export default _props =>
  (
    <div className={styles.instructions}>
      <h2> Fund your Metamask account </h2>
      <p> You need some ETH to be able to send transactions. </p>
      <div className={styles.step}>
        <div className={styles.instruction}>
          1. Open a terminal and access the truffle console
        </div>
        <div className={styles.code}>
          <code>
            truffle console
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          2. Send 0.5 ETH from one of your ganache accounts to your Metamask account.
        </div>
        <div className={styles.code}>
          <code>
            {
              getCode(
                getDefaultAddressFromGanacheAccounts(_props.ganacheAccounts),
                _props.accounts[0]
              )
            }
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          3. Congratulations!! You can now interact with the contract and increase the counter.
        </div>
      </div>
    </div>
  )
