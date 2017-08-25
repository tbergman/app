import { connect } from "react-redux"
import Link from "../components/Link"
import * as Navigation from "../services/Navigation"

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: to => Navigation.navigateTo(dispatch, to)
  }
}

const LinkContainer = connect(mapStateToProps, mapDispatchToProps)(Link)

export default LinkContainer
