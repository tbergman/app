import { connect } from "react-redux"
import { insuranceActions } from "hedvig-redux"
import Profile from "../components/Profile"
import { cashbackActions, chatActions } from "hedvig-redux"

const _apiAndNavigateToChat = (dispatch, endpoint, success) => {
  dispatch(
    chatActions.apiAndNavigateToChat({
      method: "POST",
      url: endpoint,
      body: null,
      SUCCESS: success
    })
  )
}

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
    editPersonalInfo: () => _apiAndNavigateToChat(dispatch, "/update-personal-information", "REQUESTED_PERSONAL_INFO_UPDATE"),
    editFamilyMembers: () => _apiAndNavigateToChat(dispatch, "/update-family-members", "REQUESTED_FAMILY_MEMBERS_UPDATE"),
    editApartmentInfo: () => _apiAndNavigateToChat(dispatch, "/update-apartment-information", "REQUESTED_APARTMENT_INFO_UPDATE"),
    editBankAccount: () => _apiAndNavigateToChat(dispatch, "/update-bank-account", "REQUESTED_BANK_ACCOUNT_UPDATE"),
    dispatch
  }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  Profile
)

export default ProfileContainer
