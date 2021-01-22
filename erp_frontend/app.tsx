import './css/app.css'
import 'phoenix_html'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Router from './router'

// Inject app into proper DOM element
ReactDOM.render(<Router />, document.getElementById('react-app'))