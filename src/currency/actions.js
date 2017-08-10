import {PATH_CURRENCIES} from './state'

export const updateCurrencies = (currencies) => ({
  type: 'Updating currencies in cache',
  payload: currencies,
  path: PATH_CURRENCIES,
  reducer: (state, currencies) => ({
    isLoaded: true,
    data: currencies,
  }),
})

export const fetchCurrencies = () =>
  (dispatch, getState, {api}) => {
    return api.fetchCurrencies()
      .then((currencies) => dispatch(updateCurrencies(currencies)))
  }
