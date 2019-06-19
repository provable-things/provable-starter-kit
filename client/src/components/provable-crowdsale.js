import React from 'react'
import Web3Info from './Web3Info/index'
import CounterUI from './Counter/index'
import styles from '../App.module.scss'
import DeployCheck from './deploy-check'
import StyledLoader from './styled-loader'
import Instructions from './Instructions/index'

export default _props => {
  const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = _props
  const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled)
    ? "upgrade-auto"
    : "upgrade"
  return (
    <div className={styles.wrapper}>
      {!this.state.web3 && <StyledLoader />}
      {
        this.state.web3 &&
        !this.state.contract &&
         <DeployCheck
          name='provable'
          accounts={this.state.accounts}
          ganacheAccounts={this.state.ganacheAccounts}
        />
      }
      {this.state.web3 && this.state.contract && (
        <div className={styles.contracts}>
          <h1>Counter Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account info on the left </p>
          <div className={styles.widgets}>
            <Web3Info {...this.state} />
            <CounterUI
              decrease={this.decreaseCount}
              increase={this.increaseCount}
              {...this.state} />
          </div>
          {this.state.balance < 0.1 && (
            <Instructions
              ganacheAccounts={ganacheAccounts}
              name="metamask"
              accounts={accounts} />
          )}
          {this.state.balance >= 0.1 && (
            <Instructions
              ganacheAccounts={this.state.ganacheAccounts}
              name={updgradeCommand}
              accounts={accounts} />
          )}
        </div>
      )}
    </div>
  )
}
