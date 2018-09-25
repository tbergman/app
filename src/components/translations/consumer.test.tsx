import * as React from 'react';
import { mount } from 'enzyme';
import { View } from 'react-native';
import toJson from 'enzyme-to-json';

import { TranslationsConsumer, replacePlaceholders } from './consumer';
import { TranslationsContext } from './context';

test('should render correct text key', () => {
  const testFn = jest.fn();

  const wrapper = mount(
    <TranslationsContext.Provider value={{ textKeys: { mock: 'test' } }}>
      <View>
        <TranslationsConsumer textKey="mock">
          {(text) => {
            expect(text).toEqual('test');
            testFn();

            return <View />;
          }}
        </TranslationsConsumer>
      </View>
    </TranslationsContext.Provider>,
  );

  expect(toJson(wrapper)).toMatchSnapshot();
  expect(testFn).toHaveBeenCalled();
});

test('should replace placeholders correctly', () => {
  expect(replacePlaceholders(['hello'], '{0} hej')).toEqual('hello hej');
  expect(replacePlaceholders(['hello'], '{12} hej')).toEqual('{12} hej');
});
