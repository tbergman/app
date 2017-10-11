import BaseNavigator from "../../components/navigation/base-navigator/BaseNavigator"
import { connect } from "react-redux"

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

const ConnectedReduxBaseNavigator = connect(mapStateToProps)(BaseNavigator)

export { ConnectedReduxBaseNavigator }
