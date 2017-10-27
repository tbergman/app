import { connect } from "react-redux"
import HedvigKeyboardAvoidingView from "../components/HedvigKeyboardAvoidingView"

const mapStateToProps = state => {
  return {
    keyboardState: state.keyboard.currentState
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const HedvigKeyboardAvoidingViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HedvigKeyboardAvoidingView)

export default HedvigKeyboardAvoidingViewContainer
