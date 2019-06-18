pragma solidity 0.5.0;

import './Provable.sol';
import "zos-lib/contracts/Initializable.sol";

interface SimpleTokenInterface {

    function transfer(
        address _to,
        uint256 _numberOfTokens
    )
        external
        returns (bool _success);

}

contract ProvableZeppelinCrowdsale is usingOraclize, Initializable {

    address public owner;
    address public tokenAddress;
    uint256 public totalWeiRaised;
    uint256 public ethPriceInCents;
    bool public crowdsaleInitialized;
    address public simpleTokenAddress;
    uint256 public pricePerTokenInWei;

    event LogEthPriceInCents(
        uint256 _ethPriceInCents
    );

    event TokensPurchased(
        address indexed purchaser,
        uint256 value,
        uint256 amount
    );

    function initialize(
        address _tokenAddress
    )
        initializer
        public
    {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
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
        pricePerTokenInWei = calculatePricePerTokenInWei(ethPriceInCents);
        emit LogEthPriceInCents(ethPriceInCents);
    }

    function initializeCrowdsale()
        public
    {
        require(
            msg.sender == owner &&
            !crowdsaleInitialized &&
            pricePerTokenInWei > 0 &&
            tokenAddress != address(0)
        );
        simpleTokenAddress = tokenAddress;
        crowdsaleInitialized = true;
    }

    function buyTokens()
        public
        payable
    {
        require(
            crowdsaleInitialized &&
            meetsMinimumPurchaseThreshold(msg.value)
        );
        uint256 numberOfTokens = calculateTokenAmount(msg.value);
        uint256 refundAmountInWei = calculateRefundAmountInWei(numberOfTokens);
        if (refundAmountInWei > 0) {
            msg.sender.transfer(refundAmountInWei);
            totalWeiRaised = totalWeiRaised + (msg.value - refundAmountInWei);
        } else {
            totalWeiRaised = totalWeiRaised + msg.value;
        }
        transferTokensToBuyer(numberOfTokens);
        emit TokensPurchased(
            msg.sender,
            msg.value,
            numberOfTokens
        );
    }

    function calculateRefundAmountInWei(
        uint256 _numberTokensPurchased
    )
        internal
        view
        returns (uint256 _refundAmount)
    {
        return msg.value - (_numberTokensPurchased * pricePerTokenInWei);

    }

    function meetsMinimumPurchaseThreshold(
        uint256 _weiAmount
    )
        public
        view
        returns(bool _meetsMinimumPurchaseThreshold)
    {
        return _weiAmount >= pricePerTokenInWei;
    }

    function calculateTokenAmount(
        uint256 _weiAmount
    )
        internal
        view
        returns (uint256)
    {
        return _weiAmount / pricePerTokenInWei;
    }

    function transferTokensToBuyer(
        uint256 _numberTokensPurchased
    )
        internal
    {
        SimpleTokenInterface(simpleTokenAddress)
            .transfer(
                msg.sender,
                _numberTokensPurchased
            );
    }

    function calculatePricePerTokenInWei(
        uint256 _ethPriceInCents
    )
        public
        pure
        returns(uint256 _pricePerTokenInWei)
    {
        uint256 numerator = 1 * 10 ** 20;
        return numerator / _ethPriceInCents;
    }
}
