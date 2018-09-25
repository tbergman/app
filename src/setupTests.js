import 'jsdom-global/register';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-navigation', () => ({}));

jest.mock('react-native', () => require('react-native-mock-render'), {
  virtual: true,
});

jest.useFakeTimers();
