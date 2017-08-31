import { connect } from "react-redux"
import Onboarding from "../components/Onboarding"
import { chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    dashboard: state.insurance.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(chatActions.startOnboarding())
  }
}

const OnboardingContainer = connect(mapStateToProps, mapDispatchToProps)(
  Onboarding
)

export default OnboardingContainer
