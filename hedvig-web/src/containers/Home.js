import { connect } from "react-redux"
import Home from "../components/Home"
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

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer
