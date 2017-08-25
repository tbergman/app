import React from "react"

import { addNavigationHelpers, NavigationActions } from "react-navigation"
import Navigator from "../components/Navigator"

const AppNavigator = ({ dispatch, nav }) => {
  return (
    <Navigator
      navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav
      })}
    />
  )
}

export default AppNavigator
