import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#651EFF" />
  </View>
);
