import Config from '@hedviginsurance/react-native-config';

import { Mutation, MutationToOfferClosedResolver } from 'src/graphql/types';

const offerClosedHandler = async (token: string) => {
  await fetch(`${Config.API_BASE_URL}/hedvig/onboarding/offerClosed`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const offerClosed: MutationToOfferClosedResolver<
  Mutation,
  boolean
> = async (_root, _args, { getToken }) => {
  const token = await getToken();
  await offerClosedHandler(token);
  return true;
};
