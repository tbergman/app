import { connect } from "react-redux"
import Dashboard from "../components/Dashboard"
// import { Navigation } from "../../services/Navigation"
import { insuranceActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    dashboard: state.insurance.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => console.log("load() not implemented")
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default DashboardContainer
