const typesList = [
  "API",
  "AUTHENTICATE",
  "LOADED_MESSAGES",
  "LOADED_ONBOARDING",
  "LOADED_DASHBOARD",
  "CREATED_CLAIM",
  "CHOICE_SELECTED",
  "SET_RESPONSE_VALUE",
  "SEND_CHAT_RESPONSE",
  "UPDATE_ITEM",
  "ITEM_UPDATED",
  "GET_ASSETS",
  "LOADED_ASSETS"
]

const typesMap = {}
typesList.forEach(t => (typesMap[t] = t))

module.exports = typesMap
