import React from "react"
import { connect } from "react-redux"
import { WebView, BackHandler, View } from "react-native";
import { NavigationActions } from "react-navigation"
import { NavBar } from "./NavBar";
import { NavigateBackButton } from "./Button";

class Payment extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.back())
    return true
  }

  goBack = () => {
    const { dispatch } = this.props
    dispatch(NavigationActions.back())
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar
          title="Betalning"
          headerLeft={<NavigateBackButton onPress={this.goBack} />}
        />
        <WebView
          source={{uri: "https://www.hedvig.com"}}
        />
      </View>
    )
  }
}

export default connect()(Payment)
