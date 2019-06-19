export const waitUntilPageLoaded = _ =>
  new Promise(resolve => window.addEventListener('load', resolve))

