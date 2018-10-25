import * as React from 'react';
import { shallow } from 'enzyme';

import Chat from './Chat';

const dummyProps = {
  onboardingDone: false,
  isModal: false,
  showReturnToOfferButton: false,
  componentId: '',
  intrent: '',
  messages: [],
  insurance: '',
  getAvatars: () => {},
  getMessages: (intent: string) => {},
  resetConversation: () => {},
};

it('Should render without crashing', () => {
  expect(shallow(<Chat {...dummyProps} />)).not.toThrow();
});
