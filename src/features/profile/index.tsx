import * as React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import styled from '@emotion/primitives';
import { View, ScrollView, Image } from 'react-native';

import { colors } from '@hedviginsurance/brand';
import { Loader } from 'src/components/Loader';
import { Spacing } from 'src/components/Spacing';
import { CashbackRow } from 'src/features/profile/components/CashbackRow';
import { InsuranceAddressRow } from 'src/features/profile/components/InsuranceAddressRow';
import { SafetyIncreasersRow } from 'src/features/profile/components/SafetyIncreasersRow';
import { PaymentRow } from 'src/features/profile/components/PaymentRow';
import { InsuranceCertificateRow } from 'src/features/profile/components/InsuranceCertificateRow';
import { LogoutButton } from 'src/features/profile/logoutButton';

const PROFILE_QUERY = gql`
  query ProfileQuery {
    insurance {
      address
      monthlyCost
      safetyIncreasers
      certificateUrl
    }

    cashback {
      name
      imageUrl
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`;

const Container = styled(ScrollView)({
  flex: 1,
  backgroundColor: colors.OFF_WHITE,
});

const Header = styled(View)({
  paddingTop: 24,
  paddingRight: 16,
  paddingBottom: 24,
  paddingLeft: 16,
  alignItems: 'center',
  justifyContent: 'center',
});

const CashbackImage = styled(Image)({
  width: 300,
  height: 100,
});

const Profile: React.SFC = () => (
  <Query query={PROFILE_QUERY}>
    {({ loading, error, data }) => {
      if (loading || !data) {
        return <Loader />;
      }

      if (error) {
        throw new Error(`error when fetching data: ${JSON.stringify(error, null, 2)}`);
      }

      const { insurance, cashback } = data;
      const {
        address,
        safetyIncreasers,
        monthlyCost,
        certificateUrl,
      } = insurance;
      const { name: cashbackName, imageUrl: cashbackImageUrl } = cashback;

      return (
        <Container>
          <Header>
            <Spacing height={8} />
            <CashbackImage
              source={{ uri: cashbackImageUrl }}
              resizeMode="contain"
            />
            <Spacing height={16} />
          </Header>
          <CashbackRow name={cashbackName} />
          <InsuranceAddressRow address={address} />
          <SafetyIncreasersRow safetyIncreasers={safetyIncreasers} />
          <PaymentRow monthlyCost={monthlyCost} />
          <InsuranceCertificateRow certificateUrl={certificateUrl} />
          <Spacing height={15} />
          <Mutation mutation={LOGOUT_MUTATION}>
            {(logout, { client }) => (
              <LogoutButton
                onPress={async () => {
                  await logout();
                  client.clearStore();
                }}
              />
            )}
          </Mutation>
        </Container>
      );
    }}
  </Query>
);

export { Profile };
