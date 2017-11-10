import { connect } from "react-redux"
import { EditMessageButton } from "../../components/Button"
import { chatActions, dialogActions } from "hedvig-redux"

const mapStateToProps = state => {
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
          onDismiss: () => console.log("User didn't want to edit conversation.")
        })
      )
  }
}

const EditMessageButtonContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditMessageButton
)

export default EditMessageButtonContainer
