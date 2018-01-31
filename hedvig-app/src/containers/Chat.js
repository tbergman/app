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
          title: "Vill du börja om?",
          paragraph:
            "Om du trycker ja så börjar\nkonversationen om från början",
          confirmButtonTitle: "Ja",
          dismissButtonTitle: "Nej",
          onConfirm: () => dispatch(chatActions.resetConversation()),
          onDismiss: () => {}
        })
      ),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
    showDashboard: () => dispatch(showDashboardAction())
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer
