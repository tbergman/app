import Config from '@hedviginsurance/react-native-config';

import { Mutation, MutationToLogoutResolver } from 'src/graphql/types';

interface Event {
  type: string;
  value: string;
}

const sendEventHandler = async (token: string, event: Event) => {
  await fetch(`${Config.API_BASE_URL}/event`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const sendEvent: MutationToLogoutResolver<Mutation, boolean> = async (
  _root,
  { event },
  { getToken },
) => {
  const token = await getToken();
  await sendEventHandler(token, event);
  return true;
};
