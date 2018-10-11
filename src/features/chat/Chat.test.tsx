import * as React from 'react';
import { shallow } from 'enzyme';

import Chat from './Chat';

describe('<Chat />', () => {
  it('Should render without crashing', () => {
    const spy = jest.fn();

    const component = shallow(
      <Chat isModal={true} componentId={'123'} showDashboard={spy} />,
    );
    expect(component).not.toThrow();
  });
});
