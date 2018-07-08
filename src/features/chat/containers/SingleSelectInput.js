import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { chatActions } from '../../../../hedvig-redux';
import { showDashboardAction } from '../../../actions/baseNavigation';
import { AnimatedSingleSelectOptionButton } from '../components/Button';
import {
  StyledRightAlignedOptions,
  StyledMarginContainer,
} from '../styles/chat';

class SingleSelectInput extends React.Component {
  static propTypes = {
    selectChoice: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
    goToDashboard: PropTypes.func.isRequired,
    startTrustly: PropTypes.func.isRequired,
    showOffer: PropTypes.func.isRequired,
  };

  render() {
    const {
      message,
      selectChoice,
      done,
      goToDashboard,
      startTrustly,
      showOffer,
    } = this.props;
    let anySelected = message.body.choices.some((choice) => choice.selected);
    let opts = message.body.choices.map((choice) => {
      return (
        <StyledRightAlignedOptions key={choice.text}>
          <AnimatedSingleSelectOptionButton
            hidden={anySelected && !choice.selected}
            title={choice.text}
            selected={choice.selected}
            onPress={() => {
              if (choice.type === 'selection') {
                selectChoice(message, choice);
                done(message);
              } else if (choice.type === 'link' && choice.view !== null) {
                selectChoice(message, choice);
                done(message);
                if (choice.view === 'Dashboard') {
                  goToDashboard();
                } else if (choice.view === 'Offer') {
                  showOffer();
                }
              } else if (choice.type === 'link' && choice.appUrl !== null) {
                selectChoice(message, choice);
                done(message);
                Linking.openURL(choice.appUrl);
              } else if (choice.type === 'link' && choice.webUrl !== null) {
                selectChoice(message, choice);
                done(message);
                WebBrowser.openBrowserAsync(choice.webUrl);
              } else if (choice.type === 'trustly') {
                startTrustly(choice.id);
                selectChoice(message, choice);
                done(message);
              }
            }}
          />
        </StyledRightAlignedOptions>
      );
    });
    return <StyledMarginContainer>{opts}</StyledMarginContainer>;
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChoice: (message, choice) =>
      dispatch(chatActions.selectChoice(message, choice)),
    done: (message) => dispatch(chatActions.sendChatResponse(message)),
    goToDashboard: () => dispatch(showDashboardAction()),
    startTrustly: (id) =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Payment',
          params: { id },
        }),
      ),
    showOffer: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Offer' })),
  };
};

const SingleSelectInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleSelectInput);

export default SingleSelectInputContainer;
