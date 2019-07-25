import {
  makeBuyATokenTransaction,
  makeProvableQueryTransaction,
  makeInitializeCrowdsaleTransaction
} from '../../utils/utils.js'

import React from 'react'
import { Button } from 'rimble-ui'
import styles from './Crowdsale.module.scss'

export const ProvableQueryButton = _props =>
  <Button
    className={styles.button}
    onClick={
      _ =>
        !_props.crowdsaleContract || ! _props.owner
          ? alert('How have you made it here without a crowdsale contract being deployed‽')
          : makeProvableQueryTransaction(
            _props.crowdsaleContract,
            _props.owner
          )
    }
  >
    Make Provable Query!
  </Button>

export const InitializeCrowdsaleButton = _props =>
  <Button
    className={styles.button}
    onClick={
      _ =>
        !_props.crowdsaleContract || ! _props.owner
          ? alert('How have you made it here without a crowdsale contract being deployed‽')
          : makeInitializeCrowdsaleTransaction(
            _props.crowdsaleContract,
            _props.owner
          )
    }
  >
    Initialize Your Crowdsale!
  </Button>

export const BuyATokenButton = _props =>
  <Button
    className={styles.button}
    onClick={
      _ =>
        !_props.crowdsaleContract || !_props.purchaser || !_props.weiAmount
          ? alert('How have you made it here without a crowdsale contract being deployed‽')
          : makeBuyATokenTransaction(
            _props.crowdsaleContract,
            _props.purchaser,
            _props.weiAmount
          )
    }
  >
    Buy A Token!
  </Button>
