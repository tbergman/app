import { connect } from "react-redux"
import { EditMessageButton } from "../../components/Button"
import { chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onPress: () => dispatch(chatActions.editLastResponse())
  }
}

const EditMessageButtonContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditMessageButton
)

export default EditMessageButtonContainer
