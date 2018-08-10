import { Platform } from 'react-native';
import Segment from 'react-native-analytics-segment-io';

// Segment Semantic Events (does not cover all events!)
// https://segment.com/docs/spec/semantic/
export const SemanticEvents = {
  Ecommerce: {
    CheckoutStarted: 'Checkout Started',
    CheckoutStepViewed: 'Checkout Step Viewed',
    CheckoutStepCompleted: 'Checkout Step Completed',
    PaymentInfoEntered: 'Payment Info Entered',
    OrderCompleted: 'Order Completed',
    PromotionViewed: 'Promotion Viewed',
  },
  Mobile: {
    ApplicationCrashed: 'Application Crashed',
    InstallAttributed: 'Install Attributed',
    DeepLinkOpened: 'Deep Link Opened',
  },
};

// Checkout Started
// {
//   checkout_id: 123,
//   order_id: 123,
//   revenue: 25,
//   value: 25,
//   currency: 'SEK',
// }

// Checkout Step Viewed
// {
//   checkout_id: 123,
//   order_id: 123,
//   step: Number
// }

// Checkout Step Completed
// {
//   checkout_id: 123,
//   order_id: 123,
//   step: Number
// }

// Order Completed
// {
//   checkout_id: 123,
//   order_id: 123,
//   step: Number
// }

// Payment Info Entered
// {
//   checkout_id: 123,
//   order_id: 123,
//   payment_method: 'Trustly'
// }

// Deep Link Opened
// {
//   provider: 'Branch Metrics',
//   url: 'app://landing'
// }

// Install Attributed
// {
//   provider: 'Branch Metrics',
//   campaign: {
//     source: 'Network/FB/AdWords/MoPub/Source',
//     name: 'Campaign Name',
//     content: 'Organic Content Title',
//     ad_creative: 'Red Hello World Ad',
//     ad_group: 'Red Ones'
//   }
// }

export const SegmentTracker = {
  initialize: ({ androidWriteKey, iosWriteKey, ...options }) => {
    if (Platform.OS === 'ios') {
      Segment.setup(iosWriteKey, options);
    } else if (Platform.OS === 'android') {
      Segment.setup(androidWriteKey, options).catch(() => {});
    }
  },
  identify: (userId, traits) => {
    return Segment.identify(userId, traits);
  },
  screen: (name, properties) => {
    return Segment.screen(name, properties);
  },
  track: (event, properties) => {
    return Segment.track(event, properties);
  },
  group: (groupId, traits) => {
    return Segment.group(groupId, traits);
  },
  flush: () => Segment.flush(),
  reset: () => {
    return Segment.reset();
  },
};
