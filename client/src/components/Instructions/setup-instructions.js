import {
  getGanacheWeb3,
  getNetworkIDFromWeb3
} from '../../utils/get-web3'

import React from 'react'
import styles from './Instructions.module.scss'

const renderSetupInstructions = _ =>
  <div className={styles.instructions}>
    <h1> ZepKit is running! </h1>

    <div className={styles.step}>
      <div className={styles.instruction}>
        Congratulations! Your environment is setup correctly!
        Now, you have two options:
      </div>
    </div>

    <div className={styles.step}>
      <div className={styles.instruction}>
        a. Try the <b><a href='/provable'>Provable Crowdsale</a></b> tutorial!
      </div>
    </div>

    <div className={styles.step}>
      <div className={styles.instruction}>
        b. Start your project from scratch.
      </div>
      <div className={styles.code}>
        <code>
          npm run start-blank
        </code>
      </div>
    </div>
  </div>

const renderSetupInstructionsNoWeb3 = _ =>
  <div className={styles.instructions}>
    <h1> Cannot detect Web3! </h1>
    <div className={styles.step}>
      <div className={styles.instruction}>
      Make sure you're running your local development blockchain.
      </div>
      <div className={styles.code}>
        <code>
          ganache-cli --secure -u 0 -u 1 -u 2 --deterministic
        </code>
      </div>
    </div>
    <div className={styles.step}>
      <div className={styles.instruction}>
      Also, make sure to point Metamask at your local host address:
      </div>
      <div className={styles.code}>
        <code>
          http://localhost:8545
        </code>
      </div>
    </div>
  </div>

export default class SetupInstructions extends React.Component {

  state = {
    web3: null,
    timeout: null
  }

  pollForWeb3 = _ =>
    getNetworkIDFromWeb3(getGanacheWeb3())
      .then(_web3 => _web3
        ? this.setState({ web3: _web3 })
        : Promise.reject()
      )
      .catch(_ => {
        clearTimeout()
        const timeout = setTimeout(_ => this.pollForWeb3(), 2000)
        this.setState({ timeout })
      })

  componentWillMount = _ =>
    this.pollForWeb3()

  clearTimeout = _ =>
    clearTimeout(this.state.timeout)

  componentWillUnmount = _ =>
    this.clearTimeout()

  render = _ =>
    this.state.web3
      ? renderSetupInstructions()
      : renderSetupInstructionsNoWeb3()
}
