import renderFAQ from './faq'
import renderSetup from './setup-instructions'
import renderMetamask from './metamask-instructions'
import renderEVMInstructions from './evm-instructions'
import renderProvableInstructions from './provable-instructions'

export default _props =>
  _props.name === 'provable'
    ? renderProvableInstructions(_props)
    : _props.name === 'evm'
    ? renderEVMInstructions(_props)
    : _props.name === 'faq'
    ? renderFAQ(_props)
    : _props.name === 'metamask'
    ? renderMetamask(_props)
    : renderSetup(_props)
