import { combineReducers } from "redux"
import helloReducer from "./hello"
import insuranceReducer from "./insurance"

const rootReducer = (additionalReducers = {}) =>
  combineReducers(
    Object.assign(
      {
        hello: helloReducer,
        insurance: insuranceReducer
      },
      additionalReducers
    )
  )

export default rootReducer
