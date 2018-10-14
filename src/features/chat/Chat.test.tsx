import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Chat from './Chat';

describe('<Chat />', () => {
  it('Should render without crashing', () => {
    expect(shallow(<Chat isModal={false} />)).not.toThrow();
  });

  it('Should start polling when mounted', () => {
    const spy = jest.spyOn(Chat.prototype, '_startPolling');
    const wrapper = mount(<Chat isModal={false} />);
    wrapper.instance();
    expect(spy).toHaveBeenCalled();
  });

  it('Should stop polling when unmounted', () => {
    const spy = jest.spyOn(Chat.prototype, '_stopPolling');
    const wrapper = mount(<Chat isModal={false} />);
    wrapper.instance();
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
  });
});
