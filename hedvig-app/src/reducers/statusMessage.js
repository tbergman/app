import { types } from 'hedvig-redux';

export default (state = {}, action) => {
  switch (action.type) {
    case types.STATUS_MESSAGE:
      return state;
    default:
      return state;
  }
};
