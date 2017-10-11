import { connect } from "react-redux"
import { Peril } from "../../components/dashboard/Peril"
import { createClaimAndNavigateToChat } from "../../services/Insurance"
import { insuranceActions, chatActions } from "hedvig-redux"
window.insuranceActions = insuranceActions

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    removePeril: () => dispatch(insuranceActions.removePeril()),
    addPeril: () => dispatch(insuranceActions.addPeril()),
    raisePerilClaim: peril =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: "POST",
          url: `/claim/insurance/${peril.id}`,
          body: null,
          SUCCESS: "INSURANCE_CLAIM_SUCCESS"
        })
      ),
    dispatch
  }
}

const PerilContainer = connect(mapStateToProps, mapDispatchToProps)(Peril)

export default PerilContainer
