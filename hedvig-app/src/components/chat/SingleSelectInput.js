import * as R from 'ramda';
import React from 'react';
import { Linking } from 'react-native';
import { WebBrowser } from 'expo';
import { SingleSelectOptionButton } from '../Button';
import {
  StyledRightAlignedOptions,
  StyledMarginContainer,
} from '../styles/chat';

const SingleSelectInput = ({
  message,
  selectChoice,
  done,
  goToDashboard,
  startTrustly,
  launchModal = R.identity,
}) => {
  let anySelected = message.body.choices.some((choice) => choice.selected);
  let opts = message.body.choices.map((choice) => {
    return (
      <StyledRightAlignedOptions key={choice.text}>
        <SingleSelectOptionButton
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
              } else {
                launchModal(choice);
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
};

export default SingleSelectInput;
