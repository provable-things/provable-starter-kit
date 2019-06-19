import React from 'react'
import Wallet from '../Wallet/index'
import Web3Info from '../Web3Info/index'
import styles from '../../App.module.scss'
import DeployCheck from '../DeployCheck/index'
import StyledLoader from '../StyledLoader/index'
import Instructions from '../Instructions/index'

export default _props =>
  (
    <div className={styles.wrapper}>

      {!_props.web3 && <StyledLoader />}

      {
        _props.web3 &&
        !_props.wallet &&
        <DeployCheck
          name='evm'
          accounts={_props.accounts}
          ganacheAccounts={_props.ganacheAccounts}
        />
      }

      {
        _props.web3 &&
        _props.wallet &&
        <div className={styles.contracts}>
          <h1>Wallet Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account info on the left </p>
          <div className={styles.widgets}>
            <Web3Info { ..._props }/>
            <Wallet
              { ..._props }
              renounce={_props.renounceOwnership}
            />
          </div>
          <Instructions
            name="evm"
            accounts={_props.accounts}
            ganacheAccounts={_props.ganacheAccounts}
          />
        </div>
      }
    </div>
  )
