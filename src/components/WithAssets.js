/* global require Promise */

import React from 'react';
import { AppLoading, Font } from 'expo';

export default class WithAssets extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async load() {
    let fonts = Font.loadAsync({
      merriweather: require('../../assets/fonts/Merriweather-Light.ttf'),
      circular: require('../../assets/fonts/CircularStd-Book.ttf'),
      'circular-bold': require('../../assets/fonts/CircularStd-Bold.ttf'),
      soray: require('../../assets/fonts/SoRay-ExtraBold.ttf'),
    });
    await Promise.all([fonts]);
  }

  render() {
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this.load}
          onFinish={() => this.setState({ loading: false })}
          onError={() => {
            throw new Error('Could not load the application');
          }}
        />
      );
    } else {
      return this.props.children;
    }
  }
}
