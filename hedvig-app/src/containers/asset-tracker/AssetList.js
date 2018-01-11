import { connect } from "react-redux"
import AssetList from "../../components/asset-tracker/AssetList"
import { assetActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    assets: state.assetTracker.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAssets: () => dispatch(assetActions.getAssets()),
    dispatch
  }
}

const AssetListContainer = connect(mapStateToProps, mapDispatchToProps)(
  AssetList
)

export default AssetListContainer
