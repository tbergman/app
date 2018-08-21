import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
});

export class StyledRow extends React.Component {
  render() {
    return <View {...this.props} style={styles.row} />;
  }
}

export class StyledIcon extends React.Component {
  render() {
    const { width, height, ...props } = this.props;
    return <Image {...props} style={{ width, height }} />;
  }
}
