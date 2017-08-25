const { combineReducers } = require("redux")
const helloReducer = require("./hello")

const rootReducer = (additionalReducers = {}) =>
  combineReducers(
    Object.assign(
      {
        hello: helloReducer
      },
      additionalReducers
    )
  )

module.exports = rootReducer
