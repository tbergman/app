import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  description: {
    fontFamily: 'circular',
    fontSize: 17,
    color: '#9B9BAA',
    lineHeight: 23,
  },
});

export class Description extends React.Component {
  render() {
    return <Text style={styles.description}>{this.props.children}</Text>;
  }
}
