import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  profileContainer: { flex: 1, backgroundColor: colors.WHITE },
  charityParagraph: {
    fontFamily: 'CircularStd-Book',
    color: colors.DARK_GRAY,
    fontSize: 14,
    textAlign: 'center',
    marginRight: 32,
    marginLeft: 32,
  },
  charitySignature: {
    fontFamily: 'CircularStd-Book',
    color: colors.OFF_BLACK,
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
