import React from 'react';
import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  hedvigLogo: {
    width: 96,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class HedvigLogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark.png')}
        style={styles.hedvigLogo}
      />
    );
  }
}
