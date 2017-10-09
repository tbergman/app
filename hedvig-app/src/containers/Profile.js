import { connect } from "react-redux"
import { insuranceActions } from "hedvig-redux"
import Profile from "../components/Profile"
window.insuranceActions = insuranceActions

const mapStateToProps = state => {
  return {
    user: state.user.user,
    cashbackAlternatives: state.cashback.alternatives,
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  Profile
)

export default ProfileContainer
