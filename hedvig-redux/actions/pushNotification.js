import { API } from './types';

export function registerPushToken(pushToken) {
  let body = {
    token: pushToken,
  };
  return {
    type: API,
    payload: {
      url: '/v2/push-token',
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body, null, 4),
      SUCCESS: 'REGISTERED_PUSH_TOKEN',
    },
  };
}
