import 'jsdom-global/register';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-navigation', () => ({}));
jest.mock('@hedviginsurance/react-native-config', () => ({}));
jest.mock('react-native-branch', () => ({}));
jest.mock('react-native-firebase', () => {
  return {
    messaging: jest.fn(() => {
      return {
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('myMockToken')),
      };
    }),
    notifications: jest.fn(() => {
      return {
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn(),
      };
    }),
  };
});
jest.mock('@hedviginsurance/react-native-floating-action', () => ({}));

jest.mock('react-native', () => require('react-native-mock-render'), {
  virtual: true,
});

jest.mock('react-native-svg', () => require('react-native-svg-mock'), {
  virtual: true,
});

jest.useFakeTimers();
