import { connect } from "react-redux"
import OfferDashboardHeader from "../../components/dashboard/OfferDashboardHeader"

const mapStateToProps = state => {
  return {
    currentTotalPrice: state.insurance.currentTotalPrice,
    newTotalPrice: state.insurance.newTotalPrice
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const OfferDashboardHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferDashboardHeader)

export default OfferDashboardHeaderContainer
