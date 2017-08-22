require('isomorphic-fetch')

const apiMiddleware = ({dispatch}) => next => action => {
  if (action.type !== 'API') {
    return next(action)
  }

  fetch(action.payload.url, {
    method: action.payload.method,
    headers: action.payload.headers,
    body: action.payload.body
  })
    .then(r => {
      const contentType = r.headers.get("content-type")
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return r.json()
      } else {
        return Promise.resolve()
      }
    })
    .then(data => dispatch({type: action.payload.SUCCESS, payload: data}))
    .catch(data => dispatch({type: action.payload.ERROR || 'API_ERROR', payload: data}))
}

module.exports = apiMiddleware
