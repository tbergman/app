import * as React from 'react';
import { shallow } from 'enzyme';

import OfferChat from './OfferChat';

describe('<OfferChat />', () => {
  it('Should render without crashing', () => {
    const component = shallow(<OfferChat />);
    expect(component).not.toThrow();
  });
});
