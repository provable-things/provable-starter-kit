import React from 'react'
import Web3Info from '../Web3Info/index'
import styles from '../../App.module.scss'
import DeployCheck from '../DeployCheck/index'
import StyledLoader from '../StyledLoader/index'
import Instructions from '../Instructions/index'

export default _props => {
  const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = _props
  const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled)
    ? "upgrade-auto"
    : "upgrade"
  return (
    <div className={styles.wrapper}>
      {!_props.web3 && <StyledLoader />}
      {
        _props.web3 &&
        !_props.contract &&
         <DeployCheck
          name='provable'
          accounts={_props.accounts}
          ganacheAccounts={_props.ganacheAccounts}
        />
      }
      {_props.web3 && _props.contract && (
        <div className={styles.contracts}>
          <h1>Counter Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account info on the left </p>
          <div className={styles.widgets}>
            <Web3Info { ..._props } />

            {/* <!--The counter stuff goes here --> */}

          </div>
          {_props.balance < 0.1 &&
            <Instructions
              ganacheAccounts={ganacheAccounts}
              name="metamask"
              accounts={accounts} />
          }
          {_props.balance >= 0.1 &&
            <Instructions
              ganacheAccounts={_props.ganacheAccounts}
              name={updgradeCommand}
              accounts={accounts} />
          }
        </div>
      )}
    </div>
  )
}
