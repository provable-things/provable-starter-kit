import React from 'react'
import styles from './Instructions.module.scss'
import { getDefaultAddress } from '../../utils/utils.js'

export default _props =>
  (
    <div className={styles.instructions}>
      <h2> FAQ </h2>
      <div className={styles.question}>
        Q: How do I deploy to other networks?
      </div>
      <div className={styles.separator} />
      <div className={styles.step}>
        <div className={styles.instruction}>
          1. Enter the mnemonic of the account you want to use to deploy in the <span className={styles.inline}> .env</span> file located in the top level folder.
        </div>
        <div className={styles.code}>
          <code>
            mnemonic='fill'
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          2. Start a session on the desired network. See <span className={styles.inline}>truffle-config</span> file for available options:
        </div>
        <div className={styles.code}>
          <code>
            zos session --network NETWORK_NAME --from {getDefaultAddress(_props)} --expires 3600
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          3. Push the project contracts and deploy the dependencies (if any).
        </div>
        <div className={styles.code}>
          <code>
            zos push --deploy-dependencies
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          4. Create the instances
        </div>
        <div className={styles.code}>
          <code>
            zos create CONTRACT_NAME --init --args ARGS...
          </code>
        </div>
      </div>
      <div className={styles.question}>
        Q: How do I start from scratch and remove the tutorial?
      </div>
      <div className={styles.separator} />
      <div className={styles.step}>
        <div className={styles.instruction}>
          Run this command from the top level folder.
        </div>
        <div className={styles.code}>
          <code>
            npm run start-blank
          </code>
        </div>
      </div>
      <div className={styles.question}>
        Q: How do I run tests?
      </div>
      <div className={styles.separator} />
      <div className={styles.step}>
        <div className={styles.instruction}>
          1. To execute smart contract tests run:
        </div>
        <div className={styles.code}>
          <code>
            truffle test
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          2. To test your React components, (inside the client folder) run:
        </div>
        <div className={styles.code}>
          <code>
            npm run test
          </code>
        </div>
      </div>
      <div className={styles.question}>
        Q: How do I connect to other networks from my local website?
      </div>
      <div className={styles.separator} />
      <div className={styles.step}>
        <div className={styles.instruction}>
          1. Change the fallback provider by switching <span className={styles.inline}> REACT_APP_NETWORK </span> inside the .env file located in the client folder.
        </div>
        <div className={styles.code}>
          <code>
            REACT_APP_NETWORK = https://mainnet.infura.io/v3/d6760e62b67f4937ba1ea2691046f06d
          </code>
        </div>
      </div>
      <div className={styles.step}>
        Take into account that this only switches the default provider. If you are using Metamask, you only
        need to switch network from the extension.
      </div>
    </div>
  )
