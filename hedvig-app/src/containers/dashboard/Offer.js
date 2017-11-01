import { connect } from "react-redux"
import Offer from "../../components/dashboard/Offer"
import { createClaimAndNavigateToChat } from "../../services/Insurance"
import {
  insuranceActions,
  chatActions,
  types,
  eventActions
} from "hedvig-redux"

const mapStateToProps = state => {
  return {
    insurance: state.insurance,
    currentTotalPrice: state.insurance.currentTotalPrice,
    newTotalPrice: state.insurance.newTotalPrice
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
    checkout: () => {
      dispatch({
        type: types.API,
        payload: {
          method: "POST",
          url: "/hedvig/quoteAccepted",
          body: null,
          SUCCESS: "INITIATE_CHECKOUT"
        }
      })
      ownProps.navigation.goBack()
    },
    closeModal: () => {
      dispatch(
        eventActions.event({
          type: "MODAL_CLOSED",
          value: "quote"
        })
      )
      ownProps.navigation.goBack()
    },
    dispatch
  }
}

const OfferContainer = connect(mapStateToProps, mapDispatchToProps)(Offer)

export default OfferContainer
