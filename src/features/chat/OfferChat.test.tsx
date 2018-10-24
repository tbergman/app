import * as React from 'react';
import { shallow, mount } from 'enzyme';

import OfferChat from './OfferChat';

describe('<OfferChat />', () => {
  it('Should render without crashing', () => {
    expect(shallow(<OfferChat />)).not.toThrow();
  });
});
