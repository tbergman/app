import { connect } from "react-redux"
import SingleSelectInput from "../../components/chat/SingleSelectInput"
import { chatActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.chat.messages[ownProps.messageIndex]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    done: (message, choice) => {
      return dispatch(chatActions.sendChatResponse(message, choice))
    }
  }
}

const SingleSelectInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleSelectInput
)

export default SingleSelectInputContainer
