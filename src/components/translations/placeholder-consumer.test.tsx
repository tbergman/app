import * as React from 'react';
import { View, Text } from 'react-native';
import toJson from 'enzyme-to-json';

import {
  TranslationsPlaceholderConsumer,
  replacePlaceholders,
} from './placeholder-consumer';
import { TranslationsContext } from './context';

import { mount } from 'enzyme';

test('should replace placeholders correctly', () => {
  const TestElement = <View />;

  const elementAndText = replacePlaceholders([TestElement], '{0} mock');
  const elementAndTextWrapper = mount(<View>{elementAndText}</View>);

  expect(toJson(elementAndTextWrapper)).toMatchSnapshot();

  const elementAndTextWithoutSpace = replacePlaceholders(
    [TestElement],
    '{0}mock',
  );
  const elementAndTextWithoutSpaceWrapper = mount(
    <View>{elementAndTextWithoutSpace}</View>,
  );

  expect(toJson(elementAndTextWithoutSpaceWrapper)).toMatchSnapshot();

  const withUnmatchedIndex = replacePlaceholders(['testing'], '{12} mock');
  const withUnmatchedIndexWrapper = mount(<View>{withUnmatchedIndex}</View>);

  expect(toJson(withUnmatchedIndexWrapper)).toMatchSnapshot();

  const withMultiplePlaceholders = replacePlaceholders(
    [TestElement, 'testing', TestElement],
    '{0} mock {1} mock {2}',
  );
  const withMultiplePlaceholdersWrapper = mount(
    <View>{withMultiplePlaceholders}</View>,
  );

  expect(toJson(withMultiplePlaceholdersWrapper)).toMatchSnapshot();
});

test('it should render correctly', () => {
  const TestElement = <Text />;
  const wrapper = mount(
    <TranslationsContext.Provider value={{ textKeys: { mock: '{0} mock' } }}>
      <TranslationsPlaceholderConsumer
        textKey="mock"
        placeholders={[TestElement]}
      >
        {(nodes) => <Text>{nodes}</Text>}
      </TranslationsPlaceholderConsumer>
    </TranslationsContext.Provider>,
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
