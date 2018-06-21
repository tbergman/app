import React from 'react';
import { shallow } from 'enzyme';

import { AnimatedChatOptionButton } from './Button';

const NOOP = () => {};

const standardProps = { onPress: NOOP, title: 'Test' };

describe('<AnimatedChatOptionButton />', () => {
  it('Should render without crashing given regular props', () => {
    expect(() => () =>
      shallow(<AnimatedChatOptionButton {...standardProps} />),
    ).not.toThrow();
  });

  it('Should not be visible when hidden is true', () => {
    const component = shallow(
      <AnimatedChatOptionButton {...standardProps} hidden />,
    );
    expect(component.props().style.filter((s) => s.opacity === 0)).toHaveLength(
      1,
    );
  });
});
