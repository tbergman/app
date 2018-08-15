import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../../../style';

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.PURPLE,
    minHeight: 20,
    paddingTop: 10,
    paddingRight: 18,
    paddingBottom: 10,
    paddingLeft: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: -60,
  },
  containerEnabled: {
    borderColor: colors.PURPLE,
  },
  containerDisabled: { borderColor: '#d7d7dc' },
  textEnabled: { color: colors.PURPLE },
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
