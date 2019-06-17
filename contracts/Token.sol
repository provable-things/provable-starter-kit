pragma solidity 0.5.0;

import "zos-lib/contracts/Initializable.sol";
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20, Initializable{

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public initialSupply;

    function initialize(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    )
        initializer
        public
    {
        name = _name;
        symbol = _symbol;
        decimals  = _decimals;
        initialSupply = _initialSupply;
        _mint(msg.sender, _initialSupply);
    }
}
