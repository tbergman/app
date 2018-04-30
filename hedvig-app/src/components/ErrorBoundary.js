import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  AsyncStorage,
} from 'react-native';
import Expo from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#1be9b6',
    paddingTop: Expo.Constants.statusBarHeight || 20,
  },
  errorTitle: {
    color: '#087d61',
    fontSize: 26,
    fontWeight: '600',
  },
  helpButton: {
    marginTop: 15,
    backgroundColor: '#14a07e',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 30,
  },
  helpText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
  reloadButton: {
    marginTop: 12,
  },
  reloadText: {
    fontSize: 17,
    color: '#0F007A',
    padding: 5,
    fontWeight: '600',
  },
});

const mailTo = async (email, subject = '') => {
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      }
    })
    .catch(() => {
      console.error('Cannot open mailto link'); // eslint-disable-line no-console
    });
};

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });

    this.props.raven.captureException(error, { extra: errorInfo });

    // Clear persisted state, which could be corupt
    if (!__DEV__) {
      AsyncStorage.clear();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorTitle}>Oj, nu gick något fel</Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => {
              mailTo('help@hedvig.com', 'Något gick fel');
            }}
          >
            <Text style={styles.helpText}>Rapportera felet 🙏</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={() => Expo.Util.reload()}
          >
            <Text style={styles.reloadText}>Ladda om appen</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}
