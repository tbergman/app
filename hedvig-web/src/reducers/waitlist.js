export default (state = { status: "LOADING" }, action) => {
  switch (action.type) {
    case "WAITLIST/RETRIEVED_WAITLIST_STATUS":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
