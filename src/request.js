import lodash from 'lodash'

export default ({data = null, method, uri, headers = {}, isAsync = true, withCredentials = false, json = true}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, uri, isAsync)
    if (json) {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      }
    }
    lodash.forOwn(
      headers,
      (value, header) => xhr.setRequestHeader(header, value)
    )
    xhr.withCredentials = withCredentials
    xhr.onload = () => resolve({
      body: json ? JSON.parse(xhr.response || null) : xhr.response,
      statusCode: xhr.status,
    })
    xhr.onerror = (e) => reject(`XMLHttpRequest error: ${e}`)
    xhr.send(json ? JSON.stringify(data) : data)
  })
}
