import React from 'react'
import {connect} from 'react-redux'
import {FormGroup, FormControl} from 'react-bootstrap'
import {addCurrency} from './actions'
import {allCurrenciesSelector} from './state'
import {compose, bindClosures} from '../util'

const _CurrencySelect = ({currencies, selectedCurrencyId, addCurrency}) => (
  <FormGroup>
    <FormControl componentClass="select" value={''} onChange={addCurrency}>
      <option value={''}>Select currency to add</option>
      {currencies.map((currency) => (
        <option value={currency.symbol} key={currency.symbol}>{currency.name}</option>
      ))}
    </FormControl>
  </FormGroup>
)

export default compose(
  connect(
    (state) => ({
      currencies: allCurrenciesSelector(state),
    }),
    {
      addCurrency,
    }
  ),
  bindClosures({
    addCurrency: ({addCurrency}, e) => addCurrency(e.target.value),
  })
)(_CurrencySelect)
