import { connect } from "react-redux"
import { Peril } from "../../components/dashboard/Peril"
import { insuranceActions, chatActions } from "hedvig-redux"
window.insuranceActions = insuranceActions

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    removePeril: (peril) => dispatch(insuranceActions.removePeril(peril)),
    addPeril: (peril) => dispatch(insuranceActions.addPeril(peril)),
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
