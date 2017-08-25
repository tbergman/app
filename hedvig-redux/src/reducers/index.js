import { combineReducers } from 'redux';
import helloReducer from './hello';

const rootReducer = (additionalReducers = {}) =>
  combineReducers(
    Object.assign(
      {
        hello: helloReducer
      },
      additionalReducers
    )
  )

export default rootReducer;
