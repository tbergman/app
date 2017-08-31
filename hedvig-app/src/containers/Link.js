import { connect } from "react-redux"
import {
  Link as LinkComponent,
  ClaimLink as ClaimLinkComponent
} from "../components/Link"
import * as Navigation from "../services/Navigation"
import { createClaimAndNavigateToChat } from "../services/Insurance"

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: to => Navigation.navigateTo(dispatch, to),
    createClaimAndNavigateToChat: () => createClaimAndNavigateToChat(dispatch)
  }
}

export const Link = connect(mapStateToProps, mapDispatchToProps)(LinkComponent)
export const ClaimLink = connect(mapStateToProps, mapDispatchToProps)(
  ClaimLinkComponent
)
