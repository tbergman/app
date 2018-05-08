import { LOADED_INSURANCE } from '../actions/types';

const reducer = (
  state = { categories: [], currentTotalPrice: null, newTotalPrice: null },
  action,
) => {
  switch (action.type) {
    case LOADED_INSURANCE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default reducer;
