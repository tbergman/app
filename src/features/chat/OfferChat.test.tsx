import * as React from 'react';
import { shallow } from 'enzyme';

import OfferChat from './OfferChat';

describe('<OfferChat />', () => {
  it('Should render without crashing', () => {
    const spy = jest.fn();
    const component = shallow(
      <OfferChat showDashboard={() => {}} onRequestClose={() => {}} />,
    );
    expect(component).not.toThrow();
  });
});
