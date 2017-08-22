import { connect } from "react-redux"
import App from "../components/App"
import { helloActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sayHello: name => dispatch(helloActions.hello(name))
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
