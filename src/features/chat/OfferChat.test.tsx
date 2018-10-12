import * as React from 'react';
import { shallow, mount } from 'enzyme';

import OfferChat from './OfferChat';

test('Should render without crashing', () => {
  const wrapper = mount(
    <OfferChat showDashboard={() => {}} onRequestClose={() => {}} />,
  );
});
