import React from 'react'
import { Button } from "rimble-ui"
import styles from './Instructions.module.scss'
import {
  callFxnInContract,
  getDefaultAddressFromGanacheAccounts
} from '../../utils/utils.js'

export default _props =>
    <div className={styles.instructions}>
      <h2> Your crowdsale contract is deployed! </h2>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Now it's time to use Provable to get an ETH price in USD for our contract! First, fire up a new terminal and start the ethereum-bridge:
        </div>
        <div className={styles.code}>
          <code>
            npx ethereum-bridge -H 127.0.0.1 -p 8545 --dev
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Watch the output of the bridge to see it deploying the Provable architecture to the Ganache blockchain you're running. When it's ready you'll see the following:
        </div>
        <div className={styles.code}>
          <code>
            [2019-06-21T11:18:38.633Z] INFO Listening @ &lt;SOME-ADDRESS&gt; (Oraclize Connector)
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Once the bridge is ready, it's time to make our Provable query:
        </div>
        <Button className={styles.button} onClick={
          !_props.crowdsaleContract
            ? alert('How have you made it here without a crowdsale contract being deployed‽')
            : _ => callFxnInContract(
              _props.crowdsaleContract,
              'getEthPriceViaProvable',
              _props.owner
            )
            .catch(_e => _e.message.includes('revert')
              ? alert('Transaction reverted!\nAre you sure the ethereum-bridge is up and listening?')
              : console.error('error making tx: ', _e))
        }>
          Make Provable Query
        </Button>
    </div>
  </div>
