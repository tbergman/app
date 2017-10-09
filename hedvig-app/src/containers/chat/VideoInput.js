import { connect } from "react-redux"
import VideoInput from "../../components/chat/VideoInput"
import { chatActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  let message = state.chat.messages[ownProps.messageIndex]
  return {
    message
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const VideoInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  VideoInput
)

export default VideoInputContainer
