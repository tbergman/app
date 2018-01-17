import mockData from "./mockData"

/*
REPL:
$ yarn repl
> const { fetch } = require("./src/mock/mockFetch")
undefined
> fetch("/me", {method: "GET"}).then(console.log)
Promise {
  <pending>,
  domain:
   Domain {
     domain: null,
     _events: { error: [Function: debugDomainError] },
     _eventsCount: 1,
     _maxListeners: undefined,
     members: [] } }
> { name: 'Pascal' }

ES6 import
import { fetch } from "./src/mock/mockFetch"
*/

const MOCK_TIMEOUT_MS = 200

export function fetch(url, { method = "GET" } = {}) {
  return new Promise((resolve, reject) => {
    if (
      mockData.hasOwnProperty(method) &&
      mockData[method].hasOwnProperty(url)
    ) {
      setTimeout(() => resolve(mockData[method][url]), MOCK_TIMEOUT_MS)
    } else {
      reject({
        status: 404,
        message: `Couldn't find entry for ${method} and ${url} in mockData.js`
      })
    }
  })
}
