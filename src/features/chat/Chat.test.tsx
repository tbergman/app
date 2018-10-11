import * as React from 'react';
import { shallow } from 'enzyme';

import Chat from './Chat';

describe('<Chat />', () => {
  it('Should render without crashing', () => {
    const component = shallow(<Chat />);
    expect(component).not.toThrow();
  });
});
