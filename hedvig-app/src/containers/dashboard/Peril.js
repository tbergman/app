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
    dispatch
  }
}

const PerilContainer = connect(mapStateToProps, mapDispatchToProps)(
  Peril
)

export default PerilContainer
