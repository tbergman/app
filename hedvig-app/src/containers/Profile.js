import { connect } from "react-redux"
import { insuranceActions } from "hedvig-redux"
import Profile from "../components/Profile"
import { cashbackActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    user: state.user.user,
    cashbackAlternatives: state.cashback.alternatives,
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCashback: (selectedCashback) => dispatch(cashbackActions.updateCashback(selectedCashback)),
    dispatch
  }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  Profile
)

export default ProfileContainer
