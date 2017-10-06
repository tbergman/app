import { connect } from "react-redux"
import Chat from "../components/Chat"
import { chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    messages: state.chat.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(chatActions.getMessages())
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer
