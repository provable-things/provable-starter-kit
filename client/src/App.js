import React from "react"
import { Loader } from 'rimble-ui'
import styles from './App.module.scss'
import Hero from "./components/Hero/index.js"
import Header from "./components/Header/index.js"
import Footer from "./components/Footer/index.js"
import Wallet from "./components/Wallet/index.js"
import Web3Info from "./components/Web3Info/index.js"
import CounterUI from "./components/Counter/index.js"
import getWeb3, { getGanacheWeb3 } from "./utils/getWeb3"
import Instructions from "./components/Instructions/index.js"
import { zeppelinSolidityHotLoaderOptions } from '../config/webpack'

export default class App extends React.Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    route: window.location.pathname.replace("/","")
  };

  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
    let Counter = {};
    let ProvableZeppelinCrowdsale = {}
    let Wallet = {}
    try {
      //Counter = require("../../contracts/Counter.sol");
      Wallet = require("../../contracts/Wallet.sol")
      ProvableZeppelinCrowdsale = require('../../contracts/ProvableZeppelinCrowdsale.sol')
      //console.log('Contract artifacts gotten!'); // FIXME: Remove
    } catch (e) {
      console.log('Error getting contract artifacts: ', e)
    }
    try {
      const isProd = process.env.NODE_ENV === 'production'
      if (!isProd) { // NOTE: Why is there no else?
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];
        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        console.log('balance: ', balance) // FIXME: Remove
        let instance = null;
        let instanceWallet = null;
        let deployedNetwork = null;
        //if (Counter.networks) {
        if (ProvableZeppelinCrowdsale.networks) {
          deployedNetwork = ProvableZeppelinCrowdsale.networks[networkId.toString()];
          if (deployedNetwork) {
            instance = new web3.eth.Contract(
              ProvableZeppelinCrowdsale.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (Wallet.networks) {
          deployedNetwork = Wallet.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceWallet = new web3.eth.Contract(
              Wallet.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (instance || instanceWallet) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, contract: instance, wallet: instanceWallet }, () => {
              this.updateCrowdsaleContractValuesInState(instance, instanceWallet);
              setInterval(() => {
                this.updateCrowdsaleContractValuesInState(instance, instanceWallet);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.error(error);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateCrowdsaleContractValuesInState = (instance, instanceWallet) => {
    if (instance) {
      console.log('owner: ', this.state.owner)
      console.log('tokenAddress: ', this.state.tokenAddress)
      console.log('wei raised: ', this.state.totalWeiRaised)
      console.log('ethPriceCent', this.state.ethPriceInCents)
      console.log('pricePerToken', this.state.ethPriceInCents)
      console.log('crowd sale initialized', this.state.crowdsaleInitialized)
      Promise.all(
        [
          'owner',
          'totalWeiRaised',
          'ethPriceInCents',
          'simpleTokenAddress',
          'pricePerTokenInWei',
          'crowdsaleInitialized'
        ].map(_value => this.getValueFromContractAndUpdateInState(_value))
      )
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
  }

  getValueFromContractInState = (_value) =>
    this.state.contract.methods[_value]().call()

  getValueFromContractAndUpdateInState = (_value) =>
    this.getValueFromContractInState(_value)
     .then(_returnValue => this.setState({ [_value]: _returnValue }))

  updateTokenOwner = async () => {
    const { wallet, accounts } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await wallet.methods.owner().call();
    // Update state with the result.
    this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
  };

  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    //this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    //this.getCount();
  };

  renounceOwnership = async (number) => {
    const { accounts, wallet } = this.state;
    await wallet.methods.renounceOwnership().send({ from: accounts[0] });
    this.updateTokenOwner();
  };

  renderLoader = _ =>
    (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    )


  renderBody = _ => {
    const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = this.state;
    const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled) ? "upgrade-auto" : "upgrade";
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {
          this.state.web3 &&
          !this.state.contract &&
          <DeployCheck
            name='counter'
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
    );
  }

  renderProvable = _ => {
    const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = this.state
    const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled)
      ? "upgrade-auto"
      : "upgrade"
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
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

  renderEVM = _ =>
    (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {
        this.state.web3 &&
        !this.state.wallet &&
        <DeployCheck
          name='evm'
          accounts={this.state.accounts}
          ganacheAccounts={this.state.ganacheAccounts}
        />
      }
      {this.state.web3 && this.state.wallet && (
        <div className={styles.contracts}>
          <h1>Wallet Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account info on the left </p>
          <div className={styles.widgets}>
            <Web3Info {...this.state} />
            <Wallet
              renounce={this.renounceOwnership}
              {...this.state} />
          </div>
          <Instructions
            ganacheAccounts={this.state.ganacheAccounts}
            name="evm" accounts={this.state.accounts} />
        </div>
      )}
      </div>
  )


  render = _ =>
    (
      <div className={styles.App}>
        <Header />
          {
            this.state.route === '' &&
            <Instructions
              name="setup"
              accounts={this.state.accounts}
              ganacheAccounts={this.state.ganacheAccounts}
            />
          }
          {
            this.state.route === 'faq' &&
            <FAQ
              name="faq"
              accounts={this.state.accounts}
              ganacheAccounts={this.state.ganacheAccounts}
            />
          }

          { this.state.route === 'evm' && this.renderEVM() }
          { this.state.route === 'provable' && this.renderProvable() }

        <Footer />
      </div>
    )
}
