import { connect } from "react-redux"
import Dashboard from "../../components/dashboard/Dashboard"
import { createClaimAndNavigateToChat } from "../../services/Insurance"
import { insuranceActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    categories: state.insurance.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
    dispatch
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default DashboardContainer
