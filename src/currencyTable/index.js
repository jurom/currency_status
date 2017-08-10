import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, ButtonToolbar} from 'react-bootstrap'
import {compose, onWillMount, requireLoad, formatFloat} from '../util'
import {totalSelector, currencyIdsSelector} from './state'
import {currenciesLoadedSelector} from '../currency/state'
import {save, load, refresh} from './actions'
import {fetchCurrencies} from '../currency/actions'
import CurrencyRow from './CurrencyRow'
import AddCurrency from './AddCurrency'
import './CurrencyTable.css'

const CurrencyTable = ({currencyIds, save, total, load, refresh}) => (
  <div className="CurrencyTable">
    <div className="CurrencyTable__toolbar">
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={save}>Save</Button>
        <Button bsStyle="info" onClick={load}>Load</Button>
        <Button onClick={refresh}>Refresh</Button>
      </ButtonToolbar>
      <AddCurrency />
    </div>
    <Table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Unit price</th>
          <th>Change</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {currencyIds.map((id) => (
          <CurrencyRow currencyId={id} key={id} />
        ))}
        <tr>
          <td>Sum:</td>
          <td /><td />
          <td><strong>{formatFloat(total)}</strong></td>
        </tr>
      </tbody>
    </Table>
  </div>
)

export default compose(
  connect(
    (state) => ({
      currencyIds: currencyIdsSelector(state),
      total: totalSelector(state),
      isLoaded: currenciesLoadedSelector(state),
    }),
    {
      fetchCurrencies,
      save,
      load,
      refresh,
    }
  ),
  onWillMount((props) => props.fetchCurrencies() && props.load()),
  requireLoad((props) => props.isLoaded)
)(CurrencyTable)
