import request from '../request'

export default class Api {

  fetchCurrencies = () => request({
    uri: 'https://coinmarketcap-nexuist.rhcloud.com/api/all',
    method: 'GET',
  }).then((response) => response.body)
}
