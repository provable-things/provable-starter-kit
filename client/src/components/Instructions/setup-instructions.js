import React from 'react'
import styles from './Instructions.module.scss'

export default _props => {
  const isProd = process.env.NODE_ENV === 'production'
  if (!isProd) {
    return (
      <div className={styles.instructions}>
        <h1> ZepKit is running! </h1>
        <div className={styles.step}>
          <div className={styles.instruction}>
            Congratulations! Your application is correctly setup.
            Now, you have three options:
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            a. Start your project from scratch.
          </div>
          <div className={styles.code}>
            <code>
              npm run start-blank
            </code>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.instruction}>
            b. Visit the tutorials. Start with the <a href='/counter'> Counter</a> page to deploy and interact with your first contract.
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.instruction}>
            c) Try the <a href='/provable'>Provable-Zeppelin-Crowdsale</a> tutorial!
          </div>
        </div>

      </div>

    )
  }
  return (
    <div className={styles.instructions}>
      <h1> Installation </h1>
      <div className={styles.step}>
        <div className={styles.instruction}>
          Install ZeppelinOS, Ganache, and Truffle.
        </div>
        <div className={styles.code}>
          <code>
            npm install -g truffle@5.0.2 ganache-cli@6.3.0 zos@2.2.0
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          Create a folder for your app and enter inside.
        </div>
        <div className={styles.code}>
          <code>
            mkdir my-app && cd my-app
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          Unbox the ZepKit.
        </div>
        <div className={styles.code}>
          <code>
            truffle unpack github.com:provable/provable-zeppelin-kit
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
        Run a local development blockchain.
        </div>
        <div className={styles.code}>
          <code>
            ganache-cli --secure -u 0 -u 1 -u 2 --deterministic
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
        Initialize the ZeppelinOS project.
        </div>
        <div className={styles.code}>
          <code>
            zos init zepkit
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          Switch to the client folder and run the web application to continue.
        </div>
        <div className={styles.code}>
          <code>
            cd client npm run start
          </code>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.instruction}>
          The ZepKit should now be running locally! Visit localhost:3000 in your browser for further instructions!
        </div>
      </div>
    </div>
  )
}
