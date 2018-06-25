import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    // Drop shadow
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'black',
    zIndex: 100,
    elevation: 1,
  },
  emptyHeaderItem: { width: 40, height: 40 },
});

export class StyledNavBarContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.container} />;
  }
}

export class EmptyHeaderItem extends React.Component {
  render() {
    return <View {...this.props} style={styles.emptyHeaderItem} />;
  }
}
