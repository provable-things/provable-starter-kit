import { getGanacheWeb3 } from './getWeb3'

export const getDefaultAddress = _props =>
  _props.ganacheAccounts && _props.ganacheAccounts.length > 2
    ? _props.ganacheAccounts[2]
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

export const getGanacheAddresses = _ =>
  getGanacheWeb3().eth.getAccounts()


