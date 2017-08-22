const { combineReducers } = require("redux")
const helloReducer = require("./hello")

const rootReducer = combineReducers({
  hello: helloReducer
})

module.exports = rootReducer
