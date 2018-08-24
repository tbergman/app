import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from '@emotion/primitives';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

import { colors, fonts } from '@hedviginsurance/brand';
import { Loader } from 'src/components/Loader';
import { Spacing } from 'src/components/Spacing';
import { CashbackRow } from 'src/features/profile/components/CashbackRow';
import { InsuranceAddressRow } from 'src/features/profile/components/InsuranceAddressRow';
import { SafetyIncreasersRow } from 'src/features/profile/components/SafetyIncreasersRow';
import { PaymentRow } from 'src/features/profile/components/PaymentRow';
import { InsuranceCertificateRow } from 'src/features/profile/components/InsuranceCertificateRow';
import { LogoutButton } from 'src/features/profile/components/LogoutButton';

const PROFILE_QUERY = gql`
  query ProfileQuery {
    user {
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

const Profile = () => (
  <Query query={PROFILE_QUERY}>
    {({ loading, error, data }) => {
      if (loading || !data) {
        return <Loader />;
      }

      if (error) {
        return <Loader />; // TODO Better error component
      }

      const { insurance, cashback } = data.user;
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
          {certificateUrl && (
            <InsuranceCertificateRow certificateUrl={certificateUrl} />
          )}
          <Spacing height={15} />
          <LogoutButton
            onPress={() => {
              console.log('TODO LOG USER OUT'); // eslint-disable-line no-console
            }}
          >
            Logga ut
          </LogoutButton>
        </Container>
      );
    }}
  </Query>
);

export { Profile };
