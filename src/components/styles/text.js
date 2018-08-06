import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'merriweather',
    color: colors.OFF_BLACK,
    fontSize: 16,
  },
  smallPassiveText: {
    fontFamily: 'circular',
    color: colors.DARK_GRAY,
    fontSize: 12,
  },
  passiveText: {
    fontFamily: 'circular',
    color: colors.DARK_GRAY,
    fontSize: 14,
  },
});

export class StyledPassiveText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.passiveText} />;
  }
}

export class StyledSmallPassiveText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.smallPassiveText} />;
  }
}

export class StyledHeading extends React.Component {
  render() {
    return <Text {...this.props} style={styles.heading} />;
  }
}
