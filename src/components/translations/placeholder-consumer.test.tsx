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

  const elementAndText = replacePlaceholders(
    {
      testElement: TestElement,
    },
    '{testElement} mock',
  );
  const elementAndTextWrapper = mount(<View>{elementAndText}</View>);

  expect(toJson(elementAndTextWrapper)).toMatchSnapshot();

  const elementAndTextWithoutSpace = replacePlaceholders(
    {
      testElement: TestElement,
    },
    '{testElement}mock',
  );
  const elementAndTextWithoutSpaceWrapper = mount(
    <View>{elementAndTextWithoutSpace}</View>,
  );

  expect(toJson(elementAndTextWithoutSpaceWrapper)).toMatchSnapshot();

  const withUnmatchedIndex = replacePlaceholders(
    {
      testing: 'testing',
    },
    '{somethingelse} mock',
  );
  const withUnmatchedIndexWrapper = mount(<View>{withUnmatchedIndex}</View>);

  expect(toJson(withUnmatchedIndexWrapper)).toMatchSnapshot();

  const withMultiplePlaceholders = replacePlaceholders(
    {
      testElement: TestElement,
      testing: 'testing',
    },
    '{testElement} mock {testing} mock {testElement}',
  );
  const withMultiplePlaceholdersWrapper = mount(
    <View>{withMultiplePlaceholders}</View>,
  );

  expect(toJson(withMultiplePlaceholdersWrapper)).toMatchSnapshot();
});

test('it should render correctly', () => {
  const TestElement = <Text />;
  const wrapper = mount(
    <TranslationsContext.Provider
      value={{ textKeys: { mock: '{testElement} mock' } }}
    >
      <TranslationsPlaceholderConsumer
        textKey="mock"
        replacements={{
          testElement: TestElement,
        }}
      >
        {(nodes) => <Text>{nodes}</Text>}
      </TranslationsPlaceholderConsumer>
    </TranslationsContext.Provider>,
  );

  expect(wrapper.containsMatchingElement(TestElement)).toBe(true);

  expect(toJson(wrapper)).toMatchSnapshot();
});
