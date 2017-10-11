const R = require("ramda")
const dotProp = require("dot-prop-immutable")
import {
  LOADED_ASSETS
} from "../actions/types"

const assets = [
  {
    title: "iPad Air 2",
    state: "COVERED",
    imageUrl: "https://unsplash.it/200/200"
  },
  {
    title: "Ray Ban Clubmaster",
    state: "CREATED",
    imageUrl: "https://unsplash.it/200/200"
  },
  {
    title: "iPhone 6",
    state: "PENDING",
    imageUrl: "https://unsplash.it/200/200"
  }
].map((asset, i) => {
  asset["key"] = i
  asset["id"] = i.toString()
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
