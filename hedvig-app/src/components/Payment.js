import React from "react"
import { connect } from "react-redux"
import { WebView, BackHandler, View, Text } from "react-native";
import { NavigationActions } from "react-navigation"
import { NavBar } from "./NavBar";
import { NavigateBackButton } from "./Button";

class Payment extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
    this.props.requestPaymentRegistration()
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
    if (!this.props.url) {
      return (<View><Text>Loading...</Text></View>)
    }
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

export default connect(
  state => ({
    url: state.payment.url
  }),
  dispatch => ({
    requestPaymentRegistration: () => dispatch({type: "PAYMENT/REQUEST_PAYMENT_REGISTRATION"})
  })
)(Payment)
