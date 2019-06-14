pragma solidity 0.5.0;

import './Provable.sol';
import './SimpleCrowdsale.sol';
import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract SimpleCrowdsale is IERC20 {
    using SafeMath for uint256;

    IERC20 public token;

    uint256 public totalWeiRaised;
    bool public crowdsaleInitialized;
    uint256 public pricePerTokenInWei;

    event TokensPurchased(
        address indexed purchaser,
        uint256 value,
        uint256 amount
    );

    function initializeCrowdsale(
        IERC20 _token,
        uint256 _ethPriceCents
    )
        public
    {
        require(
            _ethPriceCents > 0 &&
            !crowdsaleInitialized &&
            address(_token) != address(0)
        );
        token = _token;
        crowdsaleInitialized = true;
        pricePerTokenInWei = calculatePricePerTokenInWei(_ethPriceCents);
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
            totalWeiRaised = totalWeiRaised.add(msg.value.sub(refundAmountInWei));
        } else {
            totalWeiRaised = totalWeiRaised.add(msg.value);
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
        return msg.value.sub(_numberTokensPurchased.mul(pricePerTokenInWei));

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
        return _weiAmount.div(pricePerTokenInWei);
    }

    function transferTokensToBuyer(
        uint256 _numberTokensPurchased
    )
        internal
    {
        token.transfer(
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
        return numerator.div(_ethPriceInCents);
    }
}
