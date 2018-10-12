import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Chat from './Chat';

test('Should render without crashing', () => {
  const wrapper = mount(
    <Chat isModal={true} componentId={'123'} showDashboard={() => {}} />,
  );
});
