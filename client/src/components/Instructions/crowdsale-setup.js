import React from 'react'
import { Button } from "rimble-ui"
import styles from './Instructions.module.scss'
import { getDefaultAddressFromGanacheAccounts } from '../../utils/utils.js'

export default _props =>
    <div className={styles.instructions}>
      <h2> Build your first app with Provable & ZepKit </h2>

      <div className={styles.step}>
        <div className={styles.instruction}>
          First, ensure you have initiated your repo:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin init
          </code>
        </div>
        <div className={styles.instruction}>
          Next, we need a token to play with. Add one to your project:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin add SimpleToken
          </code>
        </div>
        <div className={styles.instruction}>
          And also add the Provable Zeppelin Crowdsale contract too:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin add ProvableZeppelinCrowdsale
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Now, connect with your local blockchain by opening a session:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin session --network development --from {
              getDefaultAddressFromGanacheAccounts(_props.ganacheAccounts)
            } --expires 3600
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Next, deploy the ProvableZeppelinCrowdsale & Token contracts to the blockchain:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin push --deploy-dependencies
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Now to initialize the token contract and mint 1,000,000 tokens:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin create SimpleToken --init initialize --args ProvableZeppelinToken,PVT,0,1000000
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Once the token is deployed, the <b>Openzeppelin CLI</b> will show you the token-contract's address in the console. Copy that address and use it to initialize your crowdsale contract like so:
        </div>
        <div className={styles.code}>
          <code>
            openzeppelin create ProvableZeppelinCrowdsale --init initialize --args <b>PASTE-TOKEN-ADDRESS-HERE</b>
          </code>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.instruction}>
          Congratulations! Your contracts should be deployed to the Ganache network! I reload this page to detect & interact with your contracts on the network!<br/><br/>
          <Button onClick={ () => window.location.reload() }>
            Reload
          </Button>
        </div>
      </div>
    </div>
