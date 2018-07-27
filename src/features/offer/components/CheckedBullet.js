import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 12,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  label: {
    flex: 1,
    fontFamily: 'circular',
    fontSize: 17,
    lineHeight: 24,
    color: '#9B9BAA',
  },
});

export class CheckedBullet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/icons/offer/offer-check.png')}
        />
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  }
}
