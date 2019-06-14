pragma solidity 0.5.0;

import './Provable.sol';
import './SimpleCrowdsale.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract ProvableZeppelinCrowdsale is usingOraclize, SimpleCrowdsale, ERC20 {

    ERC20 token;
    address public owner;
    event ethPriceInUSD(string _ethPriceInUSD);

    constructor(
        ERC20 _token
    )
        public
    {
        token = _token;
        owner = msg.sender;
    }

    function getEthPriceInUSDViaProvable()
        public
        payable
    {
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
        initializeCrowdsale(
            token,
            safeParseInt(_result, 2)
        );
        emit ethPriceInUSD(_result);
    }
}
