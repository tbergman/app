import { LOADED_CASHBACK_ALTERNATIVES } from "../actions/types"

const description =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
const cashbackAlternatives = [
  {
    title: "Rädda Barnen",
    description,
    selected: false,
    charity: true,
    imageUrl: "https://unsplash.it/400/200"
  },
  {
    title: "Mitt konto",
    description,
    selected: true,
    charity: true,
    imageUrl: "https://unsplash.it/400/200"
  }
]

const reducer = (state = { alternatives: {} }, action) => {
  switch (action.type) {
    case LOADED_CASHBACK_ALTERNATIVES:
      return Object.assign({}, state, { alternatives: action.payload })
    default:
      return state
  }
}

export default reducer
