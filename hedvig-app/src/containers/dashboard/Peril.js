import { connect } from "react-redux"
import { Peril } from "../../components/dashboard/Peril"
import { createClaimAndNavigateToChat } from "../../services/Insurance"
import { insuranceActions } from "hedvig-redux"
window.insuranceActions = insuranceActions

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removePeril: () => dispatch(insuranceActions.removePeril()),
    addPeril: () => dispatch(insuranceActions.addPeril()),
    // TODO: Create action the a saga takes where the saga creates a peril claim and navigates to the chat
    raisePerilClaim: (peril) => dispatch({
      type: "Navigation/NAVIGATE",
      routeName: "ChatBase",
      action: {
        type: "Navigation/NAVIGATE",
        routeName: "ChatBase"
      }
    }),
    dispatch
  }
}

const PerilContainer = connect(mapStateToProps, mapDispatchToProps)(
  Peril
)

export default PerilContainer
