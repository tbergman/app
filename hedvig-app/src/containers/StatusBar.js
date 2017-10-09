import { connect } from "react-redux"
import StatusBar from "../components/StatusBar"
import { statusMessageActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    message: state.statusMessage.message,
    warning: state.statusMessage.warning,
    error: state.statusMessage.error,
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStatusMessage: (messageObject) => dispatch(statusMessageActions.setStatusMessage(messageObject))
  }
}

const StatusBarContainer = connect(mapStateToProps, mapDispatchToProps)(
  StatusBar
)

export default StatusBarContainer
