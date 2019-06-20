import React from 'react'
import styles from './Instructions.module.scss'
import RenderSetupInstructions from './setup-instructions'
import RenderMetamaskInstructions from './metamask-instructions'
import RenderProvableInstructions from './provable-instructions'

export default _props =>
  <div className={styles.wrapper}>
    {
      _props.routeName === 'provable'
        ? <RenderProvableInstructions {..._props} />
        : _props.routeName === 'metamask'
        ? <RenderMetamaskInstructions {..._props} />
        : <RenderSetupInstructions {..._props} />
    }
  </div>
