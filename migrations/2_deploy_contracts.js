const contractNames = [
  'ProvableZeppelinCrowdsale.sol',
  'SimpleToken.sol'
]

module.exports = _deployer =>
  contractNames.map(_contractName =>
    _contractName === 'SimpleToken.sol'
      ? _deployer.deploy(artifacts.require(_contractName), 'Token', 'TOK', 18, 1e9)
      : _deployer.deploy(artifacts.require(_contractName), '0x0000000000000000000000000000000000000000'))
