import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import Api from './api'

export default function configureStore() {
  const initialState = undefined

  const api = new Api()

  const loggerMiddleware = createLogger()

  // Note(jurom): We need a dummy logger first so we can provide it in the thunk before the store exists
  const logger = {
    log: null,
  }

  const middlewares = [
    thunkMiddleware.withExtraArgument({api}),
    loggerMiddleware,
  ]

  const enhancer = compose(
    applyMiddleware(
      ...middlewares,
    ),
  )

  const store = createStore(rootReducer, initialState, enhancer)

  logger.log = (message, payload) => store.dispatch({
    type: message,
    payload,
  })

  return store
}
