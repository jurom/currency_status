import {setInitialState as setCurrencyInitialState} from './currency/state'
import {setInitialState as setCurrencyTableInitialState} from './currencyTable/state'
import {forwardReducerTo, compose} from './util'

const getInitialState = () => {
  const state = {
  }

  return compose(
    setCurrencyInitialState,
    setCurrencyTableInitialState,
  )(state)
}

const rootReducer = (state = getInitialState(), action) => {

  if (!action.reducer) {
    return state // fallback in case not our action
  }
  if (!action.path) {
    throw new Error('Did you forget action.path in action ' + action.type)
  }
  let reducer = forwardReducerTo(action.reducer, action.path)
  return reducer(state, action.payload)
}


export default rootReducer
