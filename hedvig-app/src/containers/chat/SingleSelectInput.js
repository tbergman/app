import { connect } from "react-redux"
import SingleSelectInput from "../../components/chat/SingleSelectInput"
import { chatActions } from "hedvig-redux"
import { showDashboardAction } from "../../actions/baseNavigation"

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.chat.messages[ownProps.messageIndex]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectChoice: (message, choice) => {
      return dispatch(chatActions.selectChoice(message, choice))
    },
    done: message => {
      return dispatch(chatActions.sendChatResponse(message))
    },
    goToDashboard: () => {
      return dispatch(showDashboardAction())
    }
  }
}

const SingleSelectInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleSelectInput
)

export default SingleSelectInputContainer
