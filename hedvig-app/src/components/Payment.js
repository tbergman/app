import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { WebView, BackHandler, View, Text } from "react-native";
import { NavigationActions } from "react-navigation"
import { NavBar } from "./NavBar";
import { NavigateBackButton } from "./Button";

class Payment extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    requestPaymentRegistration: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }

  static defaultProps = {
    url: undefined
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
    this.props.requestPaymentRegistration()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    this.props.goBack()
    return true
  }

  goBack = () => {
    this.props.goBack()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar
          title="Betalning"
          headerLeft={<NavigateBackButton onPress={this.goBack} />}
        />
        { this.props.url ? (
          <WebView
            source={{uri: this.props.url}}
          />
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    )
  }
}

export default connect(
  state => ({
    url: state.payment.url
  }),
  dispatch => ({
    requestPaymentRegistration: () => dispatch({type: "PAYMENT/REQUEST_PAYMENT_REGISTRATION"}),
    goBack: () => dispatch(NavigationActions.goBack())
  })
)(Payment)
