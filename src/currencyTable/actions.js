import lodash from 'lodash'
import {PATH_CURRENCY_TABLE, PATH_ADD_CURRENCY, currencyInputsSelector, currencyIdsSelector} from './state'
import {fetchCurrencies} from '../currency/actions'

export const setCurrencyAmount = (currencyId, amount) => ({
  type: 'Set currency amount',
  payload: {currencyId, amount},
  path: [...PATH_CURRENCY_TABLE, 'inputValues', currencyId],
  reducer: (state, {amount}) => amount,
})

export const setInputStates = (states) => ({
  type: 'Load input states',
  payload: {states},
  path: [...PATH_CURRENCY_TABLE, 'inputValues'],
  reducer: (state, {states}) => states,
})

export const setCurrencyIds = (currencyIds) => ({
  type: 'Load currency ids',
  payload: {currencyIds},
  path: [...PATH_CURRENCY_TABLE, 'currencyIds'],
  reducer: (state, {currencyIds}) => currencyIds,
})

export const save = () =>
  (dispatch, getState) => {
    const currencyIds = currencyIdsSelector(getState())
    window.localStorage.setItem('amounts', JSON.stringify(
      lodash.pick(currencyInputsSelector(getState()), currencyIds))
    )
    window.localStorage.setItem('currencyIds', JSON.stringify(currencyIds))
  }

export const load = () =>
  (dispatch, getState) => {
    const inputStates = JSON.parse(window.localStorage.getItem('amounts'))
    const currencyIds = JSON.parse(window.localStorage.getItem('currencyIds'))
    if (inputStates) dispatch(setInputStates(inputStates))
    if (currencyIds) dispatch(setCurrencyIds(currencyIds))
  }

export const selectCurrency = (currencyId) => ({
  type: 'Select currency',
  payload: {currencyId},
  path: [...PATH_ADD_CURRENCY, 'selected'],
  reducer: (state, {currencyId}) => currencyId,
})

export const addCurrency = (currencyId) => ({
  type: 'Add currency',
  payload: {currencyId},
  path: [...PATH_CURRENCY_TABLE, 'currencyIds'],
  reducer: (state, {currencyId}) => [...state, currencyId],
})

export const removeCurrency = (currencyId) => ({
  type: 'Remove currency',
  payload: {currencyId},
  path: [...PATH_CURRENCY_TABLE, 'currencyIds'],
  reducer: (state, {currencyId}) => lodash.without(state, currencyId),
})

export const refresh = () =>
  (dispatch) => dispatch(fetchCurrencies())
