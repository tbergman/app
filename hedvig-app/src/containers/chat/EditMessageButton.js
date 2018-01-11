import { connect } from "react-redux"
import { EditMessageButton } from "../../components/Button"
import { chatActions, dialogActions } from "hedvig-redux"

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onPress: () =>
      dispatch(
        dialogActions.showDialog({
          title: "Är du säker?",
          paragraph: "Om du trycker ja så tas detta meddelande bort.",
          confirmButtonTitle: "Ja",
          dismissButtonTitle: "Nej",
          onConfirm: () => dispatch(chatActions.editLastResponse()),
          onDismiss: () => {}
        })
      )
  }
}

const EditMessageButtonContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditMessageButton
)

export default EditMessageButtonContainer
