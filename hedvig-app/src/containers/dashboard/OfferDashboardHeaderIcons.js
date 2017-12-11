import { connect } from "react-redux"
import OfferDashboardHeaderIcons from "../../components/dashboard/OfferDashboardHeaderIcons"

const mapStateToProps = state => {
  return {
    currentTotalPrice: state.insurance.currentTotalPrice,
    newTotalPrice: state.insurance.newTotalPrice
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const OfferDashboardHeaderIconsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferDashboardHeaderIcons)

export default OfferDashboardHeaderIconsContainer
