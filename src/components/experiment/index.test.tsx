import * as React from 'react';
import { View } from 'react-native';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { getGroup, Experiment } from './index';

test('should return something from groups when getting a group', async () => {
  const groups = ['A', 'B'];
  expect(groups).toContain(await getGroup('test', groups));
});

test('should render content', (done) => {
  const element = <View />;

  const groups = ['A', 'B', 'C'];

  const wrapper = mount(
    <Experiment groups={groups} name="mock">
      {(group) => {
        expect(groups).toContain(group);
        return element;
      }}
    </Experiment>,
  );

  process.nextTick(() => {
    wrapper.update();
    expect(wrapper.containsMatchingElement(element)).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
