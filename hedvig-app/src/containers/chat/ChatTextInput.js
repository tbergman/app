import { connect } from "react-redux"
import ChatTextInput from "../../components/chat/ChatTextInput"
import { chatActions, dialogActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  let message = state.chat.messages[ownProps.messageIndex]
  return {
    message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (message, value) =>
      dispatch(chatActions.setResponseValue(message, value)),
    send: message =>
      dispatch(
        chatActions.sendChatResponse(message, {
          text: message._inputValue
        })
      ),
    requestPushNotifications: () => {
        dispatch(dialogActions.showDialog({
          title: "Notifikationer",
          paragraph: "Slå på pushnotifikationer för att inte missa svar från Hedvig",
          confirmButtonTitle: "Slå på",
          dismissButtonTitle: "Inte nu",
          onConfirm: () => dispatch({
            type: "PUSH_NOTIFICATIONS/REQUEST_PUSH"
          }),
          onDismiss: () => {}
      }))
    }
  }
}

const ChatTextInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatTextInput
)

export default ChatTextInputContainer
