import React from "react"
import { BaseNavigator } from "../../components/navigation/base"
import { addNavigationHelpers } from "react-navigation"
import { connect } from "react-redux"

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

export { ConnectedReduxBaseNavigator, ReduxBaseNavigator }
