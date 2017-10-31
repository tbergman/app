import { connect } from "react-redux"
import Chat from "../components/Chat"
import { registerForPushNotificationsAsync } from "../services/PushNotification"
import { chatActions, dialogActions } from "hedvig-redux"
import { showDashboardAction } from "../actions/baseNavigation"

const mapStateToProps = state => {
  return {
    messages: state.chat.messages,
    insurance: state.insurance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(chatActions.getMessages()),
    registerForPushNotifications: () =>
      registerForPushNotificationsAsync(dispatch),
    resetConversation: () =>
      dispatch(
        dialogActions.showDialog({
          title: "Återställ konversation?",
          paragraph: "Är du säker på att du vill återställa konverstationen?",
          confirmButtonTitle: "Ja",
          dismissButtonTitle: "Nej",
          onConfirm: () => dispatch(chatActions.resetConversation()),
          onDismiss: () =>
            console.log("User didn't wan't to reset conversation.")
        })
      ),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
    showDashboard: () => dispatch(showDashboardAction())
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer
