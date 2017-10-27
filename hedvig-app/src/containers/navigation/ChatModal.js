import { connect } from "react-redux"
import ChatModal from "../../components/navigation/ChatModal"
import { eventActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {}
}

// TODO Correct the `value` in MODAL_CLOSED
const mapDispatchToProps = dispatch => {
  return {
    modalClosed: () =>
      dispatch(
        eventActions.event({
          type: "MODAL_CLOSED",
          value: "quote"
        })
      )
  }
}

const ChatModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatModal
)

export default ChatModalContainer
