import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class Loader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={this.props.size || 'large'} color="#651EFF" />
      </View>
    );
  }
}
