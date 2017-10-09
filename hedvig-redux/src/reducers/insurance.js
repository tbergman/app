const R = require("ramda")
const dotProp = require("dot-prop-immutable")
import {
  LOADED_INSURANCE
} from "../actions/types"


const names = ["Peril"]
const description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
const images = [
  "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
  "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg"
]
const states = ["CREATED", "ADD_PENDING", "REMOVE_PENDING", "WAITING_FOR_PAYMENT", "NOT_COVERED", "COVERED"]
const perils = [...Array(20).keys()].map((i) => {
  let state = states[i % states.length]
  return {
    title: `${names[i % names.length]} ${i+1} ${state}`,
    key: i,
    state: state,
    imageUrl: images[i % images.length],
    description: description.substr(0, 100 + 10 * i)
  }
})
const categories = [
  {"title": "Du och din familj", perils: perils.slice(0, 7), "iconUrl": "https://unsplash.it/70/70"},
  {"title": "Boende", perils: perils.slice(7, 14), "iconUrl": "https://unsplash.it/70/70"},
  {"title": "Prylar", perils: perils.slice(14, 21), "iconUrl": "https://unsplash.it/70/70"}
]

const reducer = (state = {categories: [], currentTotalPrice: null, newTotalPrice: null}, action) => {
  switch (action.type) {
    case LOADED_INSURANCE:
      return Object.assign({}, state, {categories: categories})
    default:
      return state
  }
}

export default reducer
