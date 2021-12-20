import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Routers } from 'react-router-dom'

import Router from './Router'
import './index.css'

ReactDOM.render(
  <Routers>
    <Router />
  </Routers>,
  document.getElementById('root')
)
