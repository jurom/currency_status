import {getIn, setIn} from '../util'

export const PATH_CURRENCIES = ['currencies']

export const PATH_CURRENCY = [...PATH_CURRENCIES, 'data']

export const setInitialState = (state) =>
  setIn(state, PATH_CURRENCIES, {
    data: {},
    isLoaded: false,
  }, true)

export const currencyDataSelector = (state, id) =>
  getIn(state, [...PATH_CURRENCY, id], {last: null})

export const currencyChangeSelector = (state, id) =>
  parseFloat(currencyDataSelector(state, id).change, 10)

export const currenciesSelector = (state) =>
  getIn(state, PATH_CURRENCY)

export const currencyUnitPriceSelector = (state, id) => {
  const data = currencyDataSelector(state, id)
  if (!data) return null
  return data.price.eur
}

export const currenciesLoadedSelector = (state) =>
  getIn(state, [...PATH_CURRENCIES, 'isLoaded'])
