import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'bluebird'
// import {AppContainer} from 'react-hot-loader'
import configureStore from './configureStore'
import Root from './Root'
import './index.css'
// import App from './App'
import registerServiceWorker from './registerServiceWorker'

// const app = document.getElementById('app')

window.Promise = Promise

Promise.config({
  longStackTraces: process.env.NODE_ENV === 'development',
  warnings: process.env.NODE_ENV === 'development',
  monitoring: false,
})

const store = configureStore()

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
/* eslint: *//* global module */
// if (module.hot && typeof module.hot.accept === 'function') {
//   module.hot.accept('./Root', () => {
//     const NextRoot = require('./Root').default
//     ReactDOM.render(
//       <AppContainer>
//         <NextRoot {...{store}} />
//       </AppContainer>
//     , app)
//   })
// }
//
// ReactDOM.render(
//   <AppContainer>
//     <Root {...{store}} />
//   </AppContainer>,
//   app
// )

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
