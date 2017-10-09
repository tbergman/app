import { connect } from "react-redux"
import PhotoInput from "../../components/chat/PhotoInput"
import { chatActions, uploadActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  let message = state.chat.messages[ownProps.messageIndex]
  return {
    message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upload: (message, info) =>
      dispatch(
        uploadActions.upload(info, url =>
          chatActions.setResponseValue(message, url)
        )
      ),
    reset: message => {
      return dispatch(chatActions.setResponseValue(message, undefined))
    },
    done: message => {
      return dispatch(
        chatActions.sendChatResponse(message, {
          type: "photo_upload",
          content: message._inputValue
        })
      )
    }
  }
}

const PhotoInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  PhotoInput
)

export default PhotoInputContainer
