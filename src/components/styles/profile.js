import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  profileContainer: { flex: 1, backgroundColor: '#ffffff' },
  charityParagraph: {
    fontFamily: 'circular',
    color: '#9b9baa',
    fontSize: 14,
    textAlign: 'center',
    marginRight: 32,
    marginLeft: 32,
  },
  charitySignature: {
    fontFamily: 'circular',
    color: '#414150',
    textAlign: 'center',
    marginRight: 44,
    marginLeft: 44,
  },
});

export class StyledProfileContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.profileContainer} />;
  }
}

export class StyledCharityParagraph extends React.Component {
  render() {
    return <Text {...this.props} style={styles.charityParagraph} />;
  }
}

export class StyledCharitySignature extends React.Component {
  render() {
    return <Text {...this.props} style={styles.charitySignature} />;
  }
}
