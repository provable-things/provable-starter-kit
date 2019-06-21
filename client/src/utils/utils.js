import { curry } from 'ramda'
import { getGanacheWeb3 } from './web3-utils'

export const CROWDSALE_CONTRACT_VARIABLE_NAMES = [
  'owner',
  'tokenAddress',
  'totalWeiRaised',
  'ethPriceInCents',
  'simpleTokenAddress',
  'pricePerTokenInWei',
  'crowdsaleInitialized'
]

export const getDefaultAddressFromGanacheAccounts = _ganacheAccounts =>
  _ganacheAccounts && _ganacheAccounts.length > 2
    ? _ganacheAccounts[2]
    : '<ADDRESS>'

export const waitUntilPageLoaded = _ =>
  new Promise(resolve => window.addEventListener('load', resolve))

export const getDeployedNetwork = (_contractArtifact, _networkId) =>
  _contractArtifact.networks[_networkId.toString()]

export const getContractInstance = (_contractArtifact, _networkId, _web3) =>
  _contractArtifact.networks &&
  getDeployedNetwork(_contractArtifact, _networkId) &&
    new _web3.eth.Contract(
      _contractArtifact.abi,
      getDeployedNetwork(_contractArtifact, _networkId) &&
      getDeployedNetwork(_contractArtifact, _networkId).address
  )

export const getUserBalance = (_address, _web3) =>
  _web3.eth.getBalance(_address)

export const getUserBalanceInEth = (_address, _web3) =>
  getUserBalance(_address, _web3)
    .then(_balance => _web3.utils.fromWei(_balance, 'ether'))

export const getGanacheAccounts = _ =>
  getGanacheWeb3().eth.getAccounts()

export const getRoute = _ =>
  window.location.pathname.replace('/', '')


export const getValueFromContract = curry((_contract, _variableName) =>
  _contract
    .methods[_variableName]()
    .call()
)

export const getAllContractState = (_contract, _variableNames) =>
  Promise.all(_variableNames.map(getValueFromContract(_contract)))


export const convertCentsToDollars = _cents => {
  const dollars = _cents / 100
  return dollars.toFixed(2)
}

export const convertWeiToEth = (_wei, _web3) =>
  _wei && _web3.utils
    ? _web3.utils.fromWei(`${_wei}`, 'ether')
    : 0

export const callFxnInContract = (
  _contract,
  _fxnName,
  _from,
  _fxnParams = [],
  _value = 0,
  _gasPrice = 20e9,
  _gasLimit = 2e5 // FIXME: This might need to be higher!
) =>
  _contract
    .methods[_fxnName](..._fxnParams)
    .send({
      from: _from,
      value: _value,
      gas: _gasLimit,
      gasPrice: _gasPrice
    })

export const makeProvableQueryTransaction = (_crowdsaleContract, _address) =>
  callFxnInContract(
    _crowdsaleContract,
    'getEthPriceViaProvable',
    _address
  )
  .catch(_e =>
    _e.message.includes('revert')
      ? alert('Transaction reverted!\nAre you sure the ethereum-bridge is up and listening?')
      : alert('Error when making transaction!:\n', _e)
  )

export const makeInitializeCrowdsaleTransaction = (_crowdsaleContract, _address) =>
  callFxnInContract(
    _crowdsaleContract,
    'initializeCrowdsale',
    _address
  )
  .catch(_e => alert('Error when making transaction!:\n', _e))
