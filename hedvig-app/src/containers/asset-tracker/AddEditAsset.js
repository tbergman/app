import { connect } from "react-redux"
import AddEditAsset from "../../components/asset-tracker/AddEditAsset"
import * as Navigation from "../../services/Navigation"
import {
  assetActions,
  chatActions,
  statusMessageActions,
  dialogActions,
  uploadActions,
  environment
} from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  return {
    keyboard: state.keyboard,
    getItem: id => {
      return state.assetTracker.items.find(item => item.id === id)
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showDialog: message => dispatch(dialogActions.showDialog(message)),
    updateItem: item => {
      dispatch(
        // First upload the photo
        uploadActions.upload({
          // url: `${environment.baseURL}/asset/fileupload/`,
          body: { uri: item.photoUrl, type: "image/jpeg" },
          addToken: false,
          successActionCreator: uploadedPhotoUrl => {
            // Then, if we have a receiptUrl, upload that too
            if (item.receiptUrl) {
              return uploadActions.upload({
                body: { uri: item.receiptUrl, type: "image/jpeg" },
                successActionCreator: uploadedReceiptUrl =>
                  // Finally, POST an item with both uploadedPhotoUrl and uploadedReceiptUrl
                  assetActions.updateItem(
                    Object.assign(item, {
                      photoUrl: uploadedPhotoUrl,
                      receiptUrl: uploadedReceiptUrl
                    })
                  )
              })
            } else {
              // Otherwise, then POST an item with just uploadedPhotoUrl
              return assetActions.updateItem(
                Object.assign(item, { photoUrl: uploadedPhotoUrl })
              )
            }
          }
        })
      )
    },
    deleteItem: item => dispatch(assetActions.deleteItem(item)),
    setStatusMessage: message =>
      dispatch(statusMessageActions.setStatusMessage({ message })),
    raiseAssetClaim: asset =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: "POST",
          url: `/claim/asset/${asset.id}`,
          body: null,
          SUCCESS: "ASSET_CLAIM_SUCCESS"
        })
      )
  }
}

const AddEditAssetContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddEditAsset
)

export default AddEditAssetContainer
