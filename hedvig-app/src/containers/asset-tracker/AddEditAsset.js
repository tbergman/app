import { connect } from "react-redux"
import AddEditAsset from "../../components/asset-tracker/AddEditAsset"
import * as Navigation from "../../services/Navigation"
import { assetActions, chatActions, statusMessageActions } from "hedvig-redux"

const mapStateToProps = (state, ownProps) => {
  return {
    getItem: id => {
      return state.assetTracker.items.find(item => item.id === id)
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateItem: item => dispatch(assetActions.updateItem(item)),
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
