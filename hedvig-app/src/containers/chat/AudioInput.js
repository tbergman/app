import { connect } from "react-redux"
import AudioInput from "../../components/chat/AudioInput"
import { chatActions, uploadActions, dialogActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  let message = state.chat.messages[ownProps.messageIndex]
  return {
    message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPermissionDialog: () => dispatch(dialogActions.showDialog({
      title: "Inspelning",
      paragraph: "Vänligen aktivera ljudinspelning för Hedvig i dina systeminställningar."
    })),
    upload: (message, info) =>
      dispatch(
        uploadActions.upload(info, url =>
          chatActions.sendChatResponse(message, {
            type: "audio",
            content: url
          })
        )
      )
  }
}

const AudioInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  AudioInput
)

export default AudioInputContainer
