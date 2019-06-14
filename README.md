# :lock_with_ink_pen: Provable-Zeppelin

A Provable & ZeppelinOS example showing you how to use Provable along with Zeppelin to create data-rich smart-contracts leveraging external APIs!

This example shows you how to deploy a token and then a crowdsale contract that fetches the price of ETH via a Provable query, before configuring & opening a crowdsale allowing you to sell your tokens for $1 each!

&nbsp;

***

## :page_with_curl:  _Run the example_

<!-- TODO: Mention the need for an infura API key and the .env file! -->

***

## :page_with_curl:  _Test Instructions_

In order to run the tests you will need the __`ethereum-bridge`__ to provide a way for the Provable service to listen to events from your smart-contract.

**1)** Enter this directory & install dependencies:

__`❍ npm i`__

**2)** Launch Truffle:

__`❍ npx truffle develop`__

**3)** Open a _new_ console in the same directory & spool up the ethereum-bridge:

__`❍ npx ethereum-bridge -a 9 -H 127.0.0.1 -p 9545 --dev`__

**4)** Once the bridge is ready & listening, go back to the first console with Truffle running & set the tests going!

__`❍ truffle(develop)> test`__
