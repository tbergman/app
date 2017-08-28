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

export function fetch(url, { method = "GET", headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    if (
      mockData.hasOwnProperty(method) &&
      mockData[method].hasOwnProperty(url)
    ) {
      resolve(mockData[method][url])
    } else {
      reject({
        status: 404,
        message: `Couldn't find entry for ${method} and ${url} in mockData.js`
      })
    }
  })
}
