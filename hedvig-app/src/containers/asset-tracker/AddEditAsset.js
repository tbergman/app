import { connect } from "react-redux"
import { NavigationActions } from "react-navigation";
import AddEditAsset from "../../components/asset-tracker/AddEditAsset"
import {
  assetActions,
  chatActions,
  dialogActions,
  types
} from "hedvig-redux"

const mapStateToProps = state => {
  return {
    keyboard: state.keyboard,
    currentlyUploading: state.upload.currentlyUploading,
    getItem: id => { // TODO: Make this load properly from the state instead of deferred retrieval
      return state.assetTracker.items.find(item => item.id === id)
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showDialog: message => dispatch(dialogActions.showDialog(message)),
    updateItem: item => {
      dispatch(
        assetActions.updateItem(item, () => {
          ownProps.navigation.goBack()
        })
      )
    },
    deleteItem: item => {
      dispatch(dialogActions.showDialog({
        title: "Vill du ta bort den här prylen?",
        paragraph: "Tryck Ja för att ta bort den här prylen.",
        confirmButtonTitle: "Ja",
        dismissButtonTitle: "Nej",
        onConfirm: () => {
          dispatch(assetActions.deleteItem(item))
          ownProps.navigation.goBack()
        },
        onDismiss: () => {}
      }))
    },
    setStatusMessage: message =>
      dispatch({type: types.STATUS_MESSAGE, message }),
    raiseAssetClaim: asset =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: "POST",
          url: `/claim/asset/${asset.id}`,
          body: null,
          SUCCESS: "ASSET_CLAIM_SUCCESS"
        })
      ),
    showActionSheet: (options, callback) =>
      dispatch({
        type: types.SHOW_ACTION_SHEET,
        payload: { options, callback }
      }),
    goBack: () => dispatch(NavigationActions.back())
  }
}

const AddEditAssetContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddEditAsset
)

export default AddEditAssetContainer
