import { CREATED_CLAIM } from "../../actions/types"
import { MOCK_NEXT_CHAT_MESSAGE_VISIBLE } from "../../actions/mock/types"
import mockData from "../../mock/mockData"

const reducer = (state = { messages: [], numVisibleMessages: 1 }, action) => {
  switch (action.type) {
    case CREATED_CLAIM:
      return Object.assign({}, state, {
        messages: [...state.messages, ...mockData.claimMessages]
      })
    case MOCK_NEXT_CHAT_MESSAGE_VISIBLE:
      return Object.assign({}, state, {
        numVisibleMessages: state.numVisibleMessages + 1
      })
    default:
      return state
  }
}

export default reducer
