const R = require("ramda")
const dotProp = require("dot-prop-immutable")
import {
  LOADED_ASSETS
} from "../actions/types"

const assets = [
  {
    name: "iPad Air 2",
    state: "insured",
    imageUrl: "https://unsplash.it/200/200"
  },
  {
    name: "Ray Ban Clubmaster",
    state: "incomplete",
    imageUrl: "https://unsplash.it/200/200"
  },
  {
    name: "iPhone 6",
    state: "not_insured",
    imageUrl: "https://unsplash.it/200/200"
  }
].map((asset, i) => {
  asset["key"] = i
  asset["id"] = i
  return asset
})

const reducer = (state = {items: []}, action) => {
  switch (action.type) {
    case LOADED_ASSETS:
      return Object.assign({}, state, {items: assets})
    default:
      return state
  }
}

export default reducer
