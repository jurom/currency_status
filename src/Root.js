import {Provider} from 'react-redux'
import React from 'react'
import App from './App'

// Note(jurom): Root component is here so that
// hot reload of react works.
// We also need to get store as a prop
// because Provider does not like changing of stores
export default ({store}) => (
  <Provider store={store}>
    <App />
  </Provider>
)
