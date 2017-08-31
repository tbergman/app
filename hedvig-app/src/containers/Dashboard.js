import { connect } from "react-redux"
import Dashboard from "../components/Dashboard"
import { createClaimAndNavigateToChat } from "../services/Insurance"
import { insuranceActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    dashboard: state.insurance.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(insuranceActions.getDashboard()),
    createClaim: () => createClaimAndNavigateToChat(dispatch)
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default DashboardContainer
