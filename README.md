# :lock_with_ink_pen: Provable-Zeppelin

&nbsp;

A __Provable & ZeppelinOS__ collaboration showing you how to use __Provable__ alongside __ZeppelinOS__ in order to create data-rich smart-contracts leveraging external APIs!

This example shows you how to deploy a simple crowdsale contract which uses __Provable__ to discover the price of ETH in USD in order to correctly set the price for the tokens you're selling to $1!

&nbsp;

***

## :point_right: How to use:

__Pre Flight Checks)__ You will need Node, NPM & a browser with Metamask installed!

__1)__ First install the Open Zeppelin CLI, Truffle & Ganache globally:

__`❍ npm i -g @openzeppelin/cli@2.5.1 truffle@5.0.2 ganache-cli@6.3.0`__

__2)__ Now unpack this starter kit (or just __`cd`__ into the directory if you've already cloned it):

__`❍ openzeppelin unpack provable-things/provable-starter-kit && cd ./provable-starter-kit`__

__3)__ Next, fire up a _new_ terminal & start up a local blockchain instance with Ganache via:

__`❍ ganache-cli --secure -u 0 -u 1 -u 2 --deterministic`__

__4)__ Then in the root of the repo run the setup script:

__`❍ npm run setup`__

__5)__ Then use the Open Zeppelin CLI initialize your project:

__`❍ openzeppelin init provable-starter-kit`__

__6)__ Now enter the client directory and run the React app:

__`❍ cd client && npm run start`__

__7)__ Once the React app is built you can view it on your localhost by pointing your browser at:

__`❍ http://localhost:3000`__

__9)__ Now in your browser you should see that your Provable Starter-kit is up & running! Click on __`Provable Crowdsale`__ in the top right corner to begin creating the example dapp!

#### :computer: Happy Developing!

&nbsp;

***

## :page_with_curl:  _Smart-Contract Test Instructions_

In order to run the smart-contract tests you will need to use the __`ethereum-bridge`__ to provide a way for the Provable service to listen to events from your locally-based smart-contract(s). To get it up and running:

**1)** Enter this directory & install dependencies:

__`❍ npm i`__

**2)** Launch the Truffle develop console:

__`❍ npx truffle develop`__

**3)** Open a _new_ console in the same directory & spool up the __`ethereum-bridge`__:

__`❍ npx ethereum-bridge -a 9 -H 127.0.0.1 -p 9545 --dev`__

**4)** Once the bridge is ready & listening, go back to the first terminal where you have the Truffle development console running & set the tests going:

__`❍ truffle(develop)> test`__

```

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
