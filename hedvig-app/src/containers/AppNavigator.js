import { connect } from "react-redux"
import AppNavigator from "../components/AppNavigator"

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

const AppNavigatorContainer = connect(mapStateToProps)(AppNavigator)

export default AppNavigatorContainer
