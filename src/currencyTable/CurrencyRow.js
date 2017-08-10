import React from 'react'
import {connect} from 'react-redux'
import {FormGroup, FormControl, Button} from 'react-bootstrap'
import {bindClosures, compose, formatFloat} from '../util'
import {currencyTotalSelector, currencyInputSelector} from './state'
import {currencyUnitPriceSelector, currencyDataSelector, currencyChangeSelector} from '../currency/state'
import {setCurrencyAmount, removeCurrency} from './actions'

const _CurrencyRow = ({name, change, value, setValue, unitPrice, total, remove}) => (
  <tr>
    <td>{name}</td>
    <td>{formatFloat(unitPrice)}</td>
    <td style={{color: change > 0 ? 'green' : 'red'}}>{change}%</td>
    <td>
      <FormGroup>
        <FormControl type="text" value={value} onChange={setValue} />
      </FormGroup>
    </td>
    <td>{formatFloat(total)}</td>
    <td><Button bsStyle="danger" onClick={remove}>X</Button></td>
  </tr>
)

export default compose(
  connect(
    (state, {currencyId}) => ({
      name: currencyDataSelector(state, currencyId).name,
      change: currencyChangeSelector(state, currencyId),
      total: currencyTotalSelector(state, currencyId),
      value: currencyInputSelector(state, currencyId),
      unitPrice: currencyUnitPriceSelector(state, currencyId),
    }),
    {
      setCurrencyAmount,
      removeCurrency,
    }
  ),
  bindClosures({
    setValue: ({setCurrencyAmount, currencyId}, e) => setCurrencyAmount(currencyId, e.target.value),
    remove: ({removeCurrency, currencyId}) => removeCurrency(currencyId),
  }),
)(_CurrencyRow)
