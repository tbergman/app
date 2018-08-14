import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WebView,
  BackHandler,
  View,
  Text,
  Linking,
  StyleSheet,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { NavigationEvents } from '../../navigation/events';

const styles = StyleSheet.create({ container: { flex: 1 } });

class Payment extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    requestPaymentRegistration: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    onPaymentSuccess: PropTypes.func.isRequired,
    onPaymentFailure: PropTypes.func.isRequired,
  };

  static defaultProps = {
    url: undefined,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.props.requestPaymentRegistration(this.props.id);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.goBack(this.props.componentId);
    return true;
  };

  goBack = () => {
    this.props.goBack(this.props.componentId);
  };

  onNavigationStateChange = (event) => {
    if (event.url.match('trustly/payment-success')) {
      this.props.onPaymentSuccess(this.props.componentId);
    } else if (event.url.match('trustly/payment-failure')) {
      this.props.onPaymentFailure(this.props.componentId);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onNavigationButtonPressed={() =>
            this.props.goBack(this.props.componentId)
          }
        />
        {this.props.url ? (
          <WebView
            onError={() => {}}
            renderError={() => null}
            source={{ uri: this.props.url }}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    url: state.payment.url,
  }),
  (dispatch) => ({
    requestPaymentRegistration: (id) =>
      dispatch({
        type: 'PAYMENT/REQUEST_PAYMENT_REGISTRATION',
        payload: { id },
      }),
    onPaymentSuccess: (componentId) => {
      dispatch({
        type: 'PAYMENT/ON_PAYMENT_SUCCESS',
        payload: { onFinish: () => Navigation.dismissModal(componentId) },
      });
    },
    onPaymentFailure: (componentId) =>
      dispatch({
        type: 'PAYMENT/ON_PAYMENT_FAILURE',
        payload: { onFinish: () => Navigation.dismissModal(componentId) },
      }),
    goBack: (componentId) =>
      dispatch({
        type: 'PAYMENT/CANCEL_PAYMENT',
        payload: { onFinish: () => Navigation.dismissModal(componentId) },
      }),
  }),
)(Payment);
