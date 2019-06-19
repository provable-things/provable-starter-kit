import React from 'react'
import { Button } from "rimble-ui"
import styles from './Instructions.module.scss'
import { getDefaultAddress } from '../../utils/utils.js'

export default _props =>
  (
    <div className={styles.instructions}>
      <h2> Using EVM Packages </h2>
      <p> ZeppelinOS allows us to link packages that have been already deployed to the blockchain, instead of wasting resources deploying them again every time we need them in a project. </p>
      <div className={styles.step}>
        <div className={styles.instruction}>
          1. Connect with your local blockchain by opening a session (Note that we automatically prefilled your ganache account).
        </div>
        <div className={styles.code}>
          <code>
            zos session --network development --from {getDefaultAddress(_props)} --expires 3600
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          2. We need the ERC20 standard. Let's grab it from open zeppelin.
        </div>
        <div className={styles.code}>
          <code>
            zos link openzeppelin-eth
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          3. Add the Wallet contract to your ZeppelinOS project.
        </div>
        <div className={styles.code}>
          <code>
            zos add Wallet
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          4. Push the Wallet and deploy the dependencies (OpenZeppelin EVM).
        </div>
        <div className={styles.code}>
          <code>
            zos push --deploy-dependencies
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          5. Create an instance of the wallet.
        </div>
        <div className={styles.code}>
          <code>
            {`zos create Wallet --init --args ${_props.accounts[0]}`}
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          6. Congratulations! Your wallet contract should be good to go.
        </div>
        <Button onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          7. For extra fun, create an instance of the token to use within your wallet.
        </div>
        <div className={styles.code}>
          <code>
            {`zos create openzeppelin-eth/StandaloneERC20 --init --args 'MyToken,MYT,8,10000000000,${_props.accounts[0]},[],[]'`}
          </code>
        </div>
        <p> Interact with it using the truffle console. More info <a
          href="https://docs.zeppelinos.org/docs/linking.html"
          target="_blank"
          rel="noopener noreferrer">
        here</a>. </p>
      </div>
    </div>
  )
