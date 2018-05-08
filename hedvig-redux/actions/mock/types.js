const typesList = [
  'MOCK',
  'MOCK_NEXT_CHAT_MESSAGE_VISIBLE',
  'MOCK_LOADED_CLAIM_MESSAGES',
];

const typesMap = {};
typesList.forEach((t) => (typesMap[t] = t));

module.exports = typesMap;
