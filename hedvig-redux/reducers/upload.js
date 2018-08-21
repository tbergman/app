import { UPLOAD_STARTED, UPLOAD_SUCCEEDED } from '../actions/types';

const reducer = (
  state = {
    currentlyUploading: null,
  },
  action,
) => {
  switch (action.type) {
    case UPLOAD_STARTED:
      return Object.assign({}, state, {
        currentlyUploading: true,
      });
    case UPLOAD_SUCCEEDED:
      return Object.assign({}, state, {
        currentlyUploading: false,
      });
    default:
      return state;
  }
};

export default reducer;
