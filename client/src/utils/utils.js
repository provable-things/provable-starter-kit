export const getDefaultAddress = _props =>
  _props.ganacheAccounts && _props.ganacheAccounts.length > 2
    ? _props.ganacheAccounts[2]
    : '<ADDRESS>'

export const waitUntilPageLoaded = _ =>
  new Promise(resolve => window.addEventListener('load', resolve))

