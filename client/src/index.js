import App from './App'
import React from 'react'
import './layout/index.scss'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
