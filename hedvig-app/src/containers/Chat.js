import { connect } from "react-redux"
import Chat from "../components/Chat"
import { registerForPushNotificationsAsync } from "../services/PushNotification"
import { chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    messages: state.chat.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(chatActions.getMessages()),
    registerForPushNotifications: () => registerForPushNotificationsAsync(dispatch)
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer
