const typesList = [
  "API",
  "LOADED_ONBOARDING",
  "LOADED_DASHBOARD",
  "CREATED_CLAIM"
]

const typesMap = {}
typesList.forEach(t => (typesMap[t] = t))

module.exports = typesMap
