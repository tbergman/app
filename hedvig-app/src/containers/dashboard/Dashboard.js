import { connect } from "react-redux"
import Dashboard from "../../components/dashboard/Dashboard"
import { insuranceActions, chatActions } from "hedvig-redux"
import { registerForPushNotificationsAsync } from "../../services/PushNotification";

const mapStateToProps = state => {
  return {
    insurance: state.insurance,
    categories: state.insurance.categories,
    currentTotalPrice: state.insurance.currentTotalPrice,
    newTotalPrice: state.insurance.newTotalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
    checkout: () =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: "POST",
          url: "/hedvig/quoteAccepted",
          body: null,
          SUCCESS: "INITIATE_CHECKOUT"
        })
      ),
    registerForPushNotifications: () =>
      registerForPushNotificationsAsync(dispatch),
    dispatch
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default DashboardContainer
