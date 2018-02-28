import React from "react"
import { AsyncStorage, StatusBar } from "react-native"
import { connect } from "react-redux"
import { NavigationActions, addNavigationHelpers } from "react-navigation"
import { createReduxBoundAddListener } from "react-navigation-redux-helpers"

import BaseNavigator from "./base-navigator/BaseNavigator"
import { SEEN_MARKETING_CAROUSEL_KEY } from "../../constants"
import { REDIRECTED_INITIAL_ROUTE } from "../../actions/router"

const ReduxBaseNavigator = ({ dispatch, nav, addListener }) => {
  return (
    <BaseNavigator
      navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav,
        addListener,
      })}
    />
  )
}

const ConnectedReduxBaseNavigator = connect(({ nav }, ownProps) => ({ ...ownProps, nav }))(ReduxBaseNavigator)

class BaseRouter extends React.Component {
  constructor(props) {
    super(props)

    // Hooking up react-navigation + redux
    this.addListener = createReduxBoundAddListener("root")
  }

  _redirectToRouteHelper(routeName) {
    const { redirectToRoute } = this.props;
    redirectToRoute(routeName)
  }

  async componentDidMount() {
    if (this.props.hasRedirected) return

    let alreadySeenMarketingCarousel = await AsyncStorage.getItem(
      SEEN_MARKETING_CAROUSEL_KEY
    )

    if (!alreadySeenMarketingCarousel) {
      this._redirectToRouteHelper("Marketing")
    }
  }

  componentDidUpdate() {
    if (this.props.hasRedirected) return

    if (["ACTIVE", "INACTIVE"].includes(this.props.insurance.status)) {
      this._redirectToRouteHelper("HomeBase")
    } else {
      this._redirectToRouteHelper("ChatBase")
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* backgroundColor only applies to Android */}
        <StatusBar backgroundColor="white" />
        <ConnectedReduxBaseNavigator addListener={this.addListener} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ insurance, router }, ownProps) => {
  return {
    ...ownProps,
    insurance,
    hasRedirected: router.hasRedirected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToRoute: (routeName) => {
      dispatch({ type: REDIRECTED_INITIAL_ROUTE })
      return dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })],
        })
      )
    },
  }
}

export const Router = connect(mapStateToProps, mapDispatchToProps)(
  BaseRouter
)
