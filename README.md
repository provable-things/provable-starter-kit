# :lock_with_ink_pen: Provable-Zeppelin

A Provable & ZeppelinOS example showing you how to use Provable along with Zeppelin to create data-rich smart-contracts leveraging external APIs!

This example shows you how to deploy a token and then a crowdsale contract that fetches the price of ETH via a Provable query, before configuring & opening a crowdsale allowing you to sell your tokens for $1 each!

&nbsp;

***

## :point_right: How to use:

__1)__ First install Zos, Truffle & Ganache installed globally:
__`❍ npm install -g truffle@5.0.2 ganache-cli@6.3.0 zos@2.3.0`__

__2)__ Now unpack this zos kit:
__`❍ zos unpack github.com/provable/provable-zeppelin-kit`__

__3)__ Next, start up a local blockchain with Ganache:
__`❍ ganache-cli --secure -u 0 -u 1 -u 2 --deterministic`__

__4)__ Then initialize your project:
__`❍ zos init provable-zeppelin-tutorial`__

__5)__ Now enter the client directory and run the React app:
__`❍ cd client && npm run start`__

__6)__ Finally view the App and follow the instructions there by pointing your browser at:
__`❍ http://localhost:3000`__

***

## :page_with_curl:  _Run the example_

<!-- TODO: Mention the need for an infura API key and the .env file! -->

***

## :page_with_curl:  _Test Instructions_

In order to run the smart-contract tests you will need to use the __`ethereum-bridge`__ to provide a way for the Provable service to listen to events from your locally-based smart-contract(s). To get it up and running:

**1)** Enter this directory & install dependencies:

__`❍ npm i`__

**2)** Launch the Truffle develop console:

__`❍ npx truffle develop`__

**3)** Open a _new_ console in the same directory & spool up the __`ethereum-bridge`__:

__`❍ npx ethereum-bridge -a 9 -H 127.0.0.1 -p 9545 --dev`__

**4)** Once the bridge is ready & listening, go back to the first console with Truffle running & set the tests going!

__`❍ truffle(develop)> test`__

```javascript

  Contract: ❍ Provable Zeppelin Example
    ❍ Crowdsale Tests
      ✓ Should deploy a token (136ms)
      ✓ Should deploy the Provable Zeppelin Crowdsale Contract (139ms)
      ✓ Should give the crowdsale contract all the tokens (71ms)
      ✓ Should get web3 instantiation of contract to listen for events
      ✓ Owner can't init crowdsale before getting ETH price
      ✓ Non-owner can't get eth prices via Provable
      ✓ Should get ETH price in cents (6789ms)
      ✓ Should have stored ETH price in cents in contract
      ✓ Non-owner can't init crowdsale even if ETH price retrieved (38ms)
      ✓ Crowdsale should not yet be initialized
      ✓ Should successfully init crowdsale (46ms)
      ✓ Crowdsale should now be initialized (71ms)
      ✓ Should have set price per token in crowdsale contract
      ✓ Should have calculated price per token in wei correctly
      ✓ Should not be able to buy < 1 token (65ms)
      ✓ Should be able to buy a token (89ms)
      ✓ Should refund any change from buying tokens (100ms)


  17 passing (9s)

truffle(develop)>

```
