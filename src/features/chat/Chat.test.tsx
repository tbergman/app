import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Chat from './Chat';

describe('<Chat />', () => {
  it('Should render without crashing', () => {
    expect(shallow(<Chat isModal={false} />)).not.toThrow();
  });
});
