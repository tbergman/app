const reducer = (state = { name: null }, action) => {
  switch (action.type) {
    case 'HELLO':
      return Object.assign({}, { name: action.payload.name });
    default:
      return state;
  }
};

export default reducer;
