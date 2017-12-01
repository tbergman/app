import { connect } from "react-redux"
import { HeaderWithScroll } from "../components/Header"
import { types, eventActions } from "hedvig-redux"
import { navigateTo } from "../services/Navigation"

const mapStateToProps = state => {
  return {
    scrollY: state.scroll.scrollY,
    price: state.insurance.currentTotalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkout: () => {
      dispatch({
        type: types.CHECKOUT,
        payload: {}
      })
      navigateTo(dispatch, "/chat")
    },
    closeModal: () => {
      dispatch(
        eventActions.event(
          {
            type: "MODAL_CLOSED",
            value: "quote"
          },
          {
            getMessagesAfter: true,
            showLoadingIndicator: true
          }
        )
      )
      navigateTo(dispatch, "/chat")
    }
  }
}

const HeaderWithScrollContainer = connect(mapStateToProps, mapDispatchToProps)(
  HeaderWithScroll
)

export default HeaderWithScrollContainer
