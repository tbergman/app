import React from "react"
import { addNavigationHelpers } from "react-navigation"
import { connect } from "react-redux"
import BaseNavigator from "../../components/navigation/base-navigator/BaseNavigator"

const ReduxBaseNavigator = ({ dispatch, nav }) => {
  return (
    <BaseNavigator
      navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav
      })}
    />
  )
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

const ConnectedReduxBaseNavigator = connect(mapStateToProps)(ReduxBaseNavigator)

export { ReduxBaseNavigator, ConnectedReduxBaseNavigator }
