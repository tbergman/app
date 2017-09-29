import { connect } from "react-redux"
import Intro from "../components/Intro"
import { chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    dashboard: state.insurance.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(chatActions.getMessages())
  }
}

const IntroContainer = connect(mapStateToProps, mapDispatchToProps)(Intro)

export default IntroContainer
