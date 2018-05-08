import { REDIRECTED_INITIAL_ROUTE } from '../actions/router';

export default (state = {}, action) => {
  switch (action.type) {
    case REDIRECTED_INITIAL_ROUTE:
      return Object.assign({}, state, {
        hasRedirected: true,
      });
    default:
      return state;
  }
};
