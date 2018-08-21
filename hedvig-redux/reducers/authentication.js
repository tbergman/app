import { RECEIVED_TOKEN, DELETE_TOKEN } from '../actions/types';

const reducer = (state = { token: null }, action) => {
  switch (action.type) {
    case RECEIVED_TOKEN:
      return Object.assign({}, { token: action.payload });
    case DELETE_TOKEN:
      return Object.assign({}, { token: null });
    default:
      return state;
  }
};

export default reducer;
