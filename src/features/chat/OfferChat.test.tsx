import * as React from 'react';
import { shallow } from 'enzyme';

import OfferChat from './OfferChat';

const dummyProps = {
  intent: '',
  messages: [],
  getAvatars: () => {},
  getMessages: () => {},
  resetConversation: () => {},
  onRequestClose: () => {},
};
it('Should render without crashing', () => {
  expect(shallow(<OfferChat {...dummyProps} />)).not.toThrow();
});
