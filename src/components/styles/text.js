import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: { fontFamily: 'merriweather', color: '#414150', fontSize: 16 },
  smallPassiveText: { fontFamily: 'circular', color: '#9b9baa', fontSize: 12 },
  passiveText: { fontFamily: 'circular', color: '#414150', fontSize: 14 },
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
