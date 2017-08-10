import lodash from 'lodash'
import {getIn, setIn} from '../util'
import {currencyUnitPriceSelector, currenciesSelector} from '../currency/state'

export const PATH_CURRENCY_TABLE = ['currencyTable']

export const PATH_ADD_CURRENCY = [...PATH_CURRENCY_TABLE, 'addCurrency']

export const setInitialState = (state) =>
  setIn(state, PATH_CURRENCY_TABLE, {
    inputValues: {},
    currencyIds: [],
    addCurrency: {
      selected: '',
    },
  }, true)

export const currencyTableSelector = (state) =>
  getIn(state, PATH_CURRENCY_TABLE)


export const currencyInputsSelector = (state) =>
  currencyTableSelector(state).inputValues

export const currencyIdsSelector = (state) =>
  currencyTableSelector(state).currencyIds

export const currencyInputSelector = (state, id) =>
  currencyInputsSelector(state)[id]

export const addCurrencySelector = (state) =>
  getIn(state, PATH_ADD_CURRENCY)

export const selectedCurrencyIdSelector = (state) =>
  addCurrencySelector(state).selected

export const allCurrenciesSelector = (state) =>
  Object.values(lodash.omit(currenciesSelector(state), currencyIdsSelector(state)))

export const currencyTotalSelector = (state, id) => {
  const amount = parseFloat(currencyInputSelector(state, id))
  if (!amount && (amount !== 0)) return 0
  const unitPrice = currencyUnitPriceSelector(state, id)
  return amount * unitPrice
}

export const totalSelector = (state) =>
  currencyIdsSelector(state).map((id) => currencyTotalSelector(state, id)).reduce((x, y) => x + y, 0)
