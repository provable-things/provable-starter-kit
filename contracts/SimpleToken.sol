pragma solidity 0.5.0;

import "zos-lib/contracts/Initializable.sol";

contract SimpleToken is Initializable {

    string public name;
    string public symbol;
    uint8 public decimals;
    bool public initialized;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(
        address indexed _to,
        address indexed _from,
        uint256 _numberOfTokens
    );

    function initialize(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    )
        initializer
        public
    {
        name = _name;
        symbol = _symbol;
        decimals  = _decimals;
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply * 10 ** uint256(decimals);
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function transfer(
        address _to,
        uint256 _numberOfTokens
    )
        public
        returns (bool _success)
    {
        balanceOf[msg.sender] = balanceOf[msg.sender] - _numberOfTokens;
        balanceOf[_to] = balanceOf[_to] + _numberOfTokens;
        emit Transfer(msg.sender, _to, _numberOfTokens);
        return true;
    }
}
