import {
  LOADED_USER
} from "../actions/types"

const user = {
  "name": "Anakin Skywalker",
  "familyMembers": [
    "Anakin Skywalker",
    "Padmé Amidala",
    "Luke Skywalker",
    "Leia Organa"
  ],
  "age": 26,
  "email": "anakkin@skywalk.er",
  "address": "Krukmakargatan 5",
  "livingAreaSqm": "48",
  "maskedBankAccountNumber": "XXXX XXXX 1234",
  "selectedCashback": "Rädda Barnen"
}

const reducer = (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case LOADED_USER:
      return Object.assign({}, state, {currentUser: action.payload})
    default:
      return state
  }
}

export default reducer
