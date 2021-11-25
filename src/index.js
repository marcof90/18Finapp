import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' 
// import { App } from './App'
import Router from './Router'
require('dotenv').config()
// ReactDOM.render( <App /> , document.getElementById('root'))
ReactDOM.render( 
    <BrowserRouter>
        <Router />
    </BrowserRouter>
    , document.getElementById('root'))
