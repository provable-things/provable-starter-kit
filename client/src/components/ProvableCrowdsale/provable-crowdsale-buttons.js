import React from 'react'
import { Button } from 'rimble-ui'
import styles from './Crowdsale.module.scss'
import { makeProvableQueryTransaction } from '../../utils/utils.js'

export const ProvableQueryButton = _props =>
  <Button
    className={styles.button}
    onClick={
      !_props.crowdsaleContract || ! _props.owner
        ? alert('How have you made it here without a crowdsale contract being deployed‽')
        : makeProvableQueryTransaction(
          _props.crowdsaleContract,
          _props.owner
        )
  }>
    Make Provable Query
  </Button>
