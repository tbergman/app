import React from 'react';
import { shallow } from 'enzyme';

import {
  AnimatedSingleSelectOptionButton,
  AnimatedMultipleSelectOptionButton,
  BackToOfferButton,
  SendButton,
} from './Button';

const NOOP = () => {};

const standardProps = { onPress: NOOP, title: 'Test' };

describe('<AnimatedSingleSelectOptionButton />', () => {
  it('Should render without crashing given regular props', () => {
    expect(() => () =>
      shallow(<AnimatedSingleSelectOptionButton {...standardProps} />),
    ).not.toThrow();
  });

  it('Should not be visible when hidden is true', () => {
    const component = shallow(
      <AnimatedSingleSelectOptionButton {...standardProps} hidden />,
    );
    expect(component.props().style.filter((s) => s.opacity === 0)).toHaveLength(
      1,
    );
  });
});

describe('<AnimatedMultipleSelectOptionButton />', () => {
  it('Should render without crashing given regular props', () => {
    expect(() =>
      shallow(<AnimatedMultipleSelectOptionButton {...standardProps} />),
    ).not.toThrow();
  });
});

describe('<BackToOfferButton />', () => {
  it('Should render without crashing given regular props', () => {
    expect(() => shallow(<BackToOfferButton onPress={NOOP} />)).not.toThrow();
  });
});

describe('<SendButton />', () => {
  it('Should render without crashing given regular props', () => {
    expect(() =>
      shallow(<SendButton onPress={NOOP} disabled={false} />),
    ).not.toThrow();
  });

  it('Should not call onPress when pressed in disabled state', () => {
    const spy = jest.fn();
    const component = shallow(<SendButton onPress={spy} disabled />);
    component.simulate('press');
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should call onPress when pressed in enabled state', () => {
    const spy = jest.fn();
    const component = shallow(<SendButton onPress={spy} disabled={false} />);
    component.simulate('press');
    expect(spy).toHaveBeenCalled();
  });
});
