const Web3 = require('web3')
const { waitForEvent } = require('./utils')
const TokenContract = artifacts.require('Token.sol')
const shouldFail = require('openzeppelin-test-helpers/src/shouldFail')
const ProvableZeppelinCrowdsale = artifacts.require('ProvableZeppelinCrowdsale.sol')
const web3WithWebSockets = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:9545'))
const { toBN } = web3.utils

contract('❍ Provable Zeppelin Example', ([
  _,
  _owner,
  _tokenBuyer,
  ...otherAccounts
]) => {
  describe('❍ Crowdsale Tests', () => {
    let tokenAddress
    let tokenMethods
    let ethPriceInCents
    let tokenPriceInWei
    let provableZeppelinEvents
    let provableZeppelinMethods
    let provableZeppelinAddress
    let provableZeppelinContract

    const gasAmount = 1e6
    const gasPrice = 20e9
    const tokenDecimals = 0
    const tokenSymbol = 'PVT'
    const initialTokenSupply = 1e6
    const tokenName = 'ProvableZeppelinToken'

    const shouldRevert = _method =>
      shouldFail.reverting(_method)

    it('Should deploy a token', async () => {
      const deployedToken = await TokenContract
        .new(
          tokenName,
          tokenSymbol,
          tokenDecimals,
          initialTokenSupply,
          { from: _owner }
        )
      const tokenContract = deployedToken.contract
      tokenAddress = tokenContract._address
      tokenMethods = tokenContract.methods
    })

    it('Should deploy the Provable Zeppelin Crowdsale Contract', async () => {
      const deployedProvableZeppelinContract = await ProvableZeppelinCrowdsale
        .new(tokenAddress, { from: _owner })
      provableZeppelinContract = deployedProvableZeppelinContract.contract
      provableZeppelinAddress = provableZeppelinContract._address
    })

    it('Should give the crowdsale contract all the tokens', async () => {
      await tokenMethods
        .transfer(
          provableZeppelinAddress,
          initialTokenSupply
        )
        .send({
          from: _owner,
          gas: gasAmount
        })
      const contractTokenBalance = await tokenMethods
        .balanceOf(provableZeppelinAddress)
        .call()
      assert.strictEqual(
        parseInt(contractTokenBalance),
        initialTokenSupply
      )
    })

    it('Should get web3 instantiation of contract to listen for events', () => {
      const { events, methods } = new web3WithWebSockets.eth.Contract(
        provableZeppelinContract._jsonInterface,
        provableZeppelinAddress
      )
      provableZeppelinEvents = events
      provableZeppelinMethods = methods
    })

    it('Should get ETH price in USD', async () => {
      await provableZeppelinMethods
        .getEthPriceInUSDViaProvable()
        .send({
          from: _owner,
          gas: gasAmount
        })
      const {
        returnValues: { _ethPriceInUSD }
      } = await waitForEvent(provableZeppelinEvents.ethPriceInUSD)
      ethPriceInCents = parseInt(_ethPriceInUSD.replace('.', '').slice(0, -3))
      assert.isTrue(parseInt(_ethPriceInUSD) > 0)
    })

    it('Should have initialized the crowdsale after getting ETH price', async () => {
      const crowdsaleInitialized = await provableZeppelinMethods
        .crowdsaleInitialized()
        .call()
      assert.isTrue(crowdsaleInitialized)
    })

    it('Should have set price per token in crowdsale contract', async () => {
      tokenPriceInWei = await provableZeppelinMethods
        .pricePerTokenInWei()
        .call()
      assert.isTrue(parseInt(tokenPriceInWei) > 0)
    })

    it('Should have calculated price per token in wei correctly', () => {
      const expectedTokenPriceInWei = toBN(1e20).div(toBN(ethPriceInCents))
      assert.strictEqual(
        parseInt(tokenPriceInWei),
        expectedTokenPriceInWei.toNumber()
      )
    })

    it('Should not be able to buy < 1 token', async () => {
      const tokenBalanceBefore = await tokenMethods
        .balanceOf(_tokenBuyer)
        .call()
      assert.isTrue(parseInt(tokenBalanceBefore) === 0)
      await shouldRevert(
        provableZeppelinMethods
          .buyTokens()
          .send({
            gas: gasAmount,
            from: _tokenBuyer,
            value: tokenPriceInWei - 1
          })
      )
      const tokenBalanceAfter = await tokenMethods
        .balanceOf(_tokenBuyer)
        .call()
      assert.isTrue(parseInt(tokenBalanceAfter) === 0)
    })

    it('Should be able to buy a token', async () => {
      const tokenBalanceBefore = await tokenMethods
        .balanceOf(_tokenBuyer)
        .call()
      assert.isTrue(parseInt(tokenBalanceBefore) === 0)
      await provableZeppelinMethods
        .buyTokens()
        .send({
          gas: gasAmount,
          from: _tokenBuyer,
          value: parseInt(tokenPriceInWei)
        })

      const tokenBalanceAfter = await tokenMethods
        .balanceOf(_tokenBuyer)
        .call()
      assert.isTrue(parseInt(tokenBalanceAfter) === 1)
    })

    it('Should refund any change from buying tokens', async () => {
      const purchaseAmountBN = toBN(1e18)
      const ethBalanceBefore = toBN(
        await web3
          .eth
          .getBalance(_tokenBuyer)
      )
      const tokenBalanceBefore = toBN(
        await tokenMethods
          .balanceOf(_tokenBuyer)
          .call()
      )
      const { gasUsed } = await provableZeppelinMethods
        .buyTokens()
        .send({
          gas: gasAmount,
          from: _tokenBuyer,
          gasPrice: gasPrice,
          value: purchaseAmountBN
        })
      const ethBalanceAfter = toBN(
        await web3
          .eth
          .getBalance(_tokenBuyer)
      )
      const tokenBalanceAfter = toBN(
        await tokenMethods
          .balanceOf(_tokenBuyer)
          .call()
      )
      const pricePerTokenBN = toBN(tokenPriceInWei)
      const ethBalanceDelta = ethBalanceBefore
        .sub(ethBalanceAfter)
      const tokenBalanceDelta = tokenBalanceAfter
        .sub(tokenBalanceBefore)
      const gasTotalBN = toBN(gasUsed)
        .mul(toBN(gasPrice))
      const expectedTokenBalanceDelta = purchaseAmountBN
        .div(pricePerTokenBN)
      const expectedEthBalanceDelta = gasTotalBN
        .add(tokenBalanceDelta.mul(pricePerTokenBN))
      assert.isTrue(expectedTokenBalanceDelta.eq(tokenBalanceDelta))
      assert.isTrue(expectedEthBalanceDelta.eq(ethBalanceDelta))
    })
  })
})
