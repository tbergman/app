/* global require */
import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { chatActions } from 'hedvig-redux';

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: '#651EFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.37,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
    },
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 10,
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 20,
    width: 18,
    height: 24,
  },
});

const FloatingChatButtonComponent = ({ dispatch, insurance }) => {
  if (insurance.status !== 'PENDING') {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          dispatch(
            chatActions.apiAndNavigateToChat({
              method: 'POST',
              url: '/chat/main',
              body: null,
              SUCCESS: 'INITIATED_CHAT_MAIN',
            }),
          )
        }
      >
        <Image
          source={require('../../../assets/buttons/fab/fab-icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export const FloatingChatButton = connect(state => ({
  insurance: state.insurance,
}))(FloatingChatButtonComponent);
