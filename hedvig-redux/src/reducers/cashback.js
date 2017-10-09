import {
  LOADED_CASHBACK_ALTERNATIVES
} from "../actions/types"

const description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
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
    charity: false,
    imageUrl: "https://unsplash.it/400/200"
  }
]

const reducer = (state = { alternatives: {} }, action) => {
  switch (action.type) {
    case LOADED_CASHBACK_ALTERNATIVES:
      return Object.assign({}, state, {alternatives: cashbackAlternatives})
    default:
      return state
  }
}

export default reducer
