pragma solidity 0.5.0;

import './Provable.sol';
import './SimpleCrowdsale.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract ProvableZeppelinCrowdsale is usingOraclize, SimpleCrowdsale, ERC20 {

    ERC20 token;
    address public owner;
    uint256 public ethPriceInCents;
    event LogEthPriceInCents(uint256 _ethPriceInCents);

    constructor(
        ERC20 _token
    )
        public
    {
        token = _token;
        owner = msg.sender;
    }

    function getEthPriceViaProvable()
        public
        payable
    {
        require(msg.sender == owner);
        oraclize_query(
            "URL",
            "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0"
        );
    }

    function __callback(
        bytes32 _queryID,
        string memory _result
    )
        public
    {
        require(msg.sender == oraclize_cbAddress());
        ethPriceInCents = parseInt(_result, 2);
        emit LogEthPriceInCents(ethPriceInCents);
    }

    function initializeCrowdsale()
        public
    {
        require(
            ethPriceInCents > 0 &&
            msg.sender == owner
        );
        initCrowdsale(
            token,
            ethPriceInCents
        );
    }
}
