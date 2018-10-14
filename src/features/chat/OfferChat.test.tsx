import * as React from 'react';
import { shallow, mount } from 'enzyme';

import OfferChat from './OfferChat';

describe('<OfferChat />', () => {
  it('Should render without crashing', () => {
    expect(shallow(<OfferChat />)).not.toThrow();
  });

  it('Should start polling when mounted', () => {
    const spy = jest.spyOn(OfferChat.prototype, '_startPolling');
    const wrapper = mount(<OfferChat />);
    wrapper.instance();
    expect(spy).toHaveBeenCalled();
  });

  it('Should stop polling when unmounted', () => {
    const spy = jest.spyOn(OfferChat.prototype, '_stopPolling');
    const wrapper = mount(<OfferChat />);
    wrapper.instance();
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
  });
});
