import { connect } from "react-redux"
import MessageList from "../../components/chat/MessageList"
import { chatActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.chat.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const MessageListContainer = connect(mapStateToProps, mapDispatchToProps)(
  MessageList
)

export default MessageListContainer
