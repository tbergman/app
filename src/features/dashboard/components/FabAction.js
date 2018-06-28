import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#651eff',
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerEnabled: {
    borderColor: '#651eff',
  },
  containerDisabled: { borderColor: '#d7d7dc' },
  textEnabled: { color: '#651eff' },
  textDisabled: { color: '#d7d7dc' },
});

class FabAction extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  };
  render() {
    const { text, enabled } = this.props;
    return (
      <View
        style={[
          styles.container,
          enabled ? styles.containerEnabled : styles.containerDisabled,
        ]}
      >
        <Text style={enabled ? styles.textEnabled : styles.textDisabled}>
          {text}
        </Text>
      </View>
    );
  }
}

export default FabAction;
