import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/primitives';
import { ScrollView, View, Text } from 'react-native';

import { Loader } from 'src/components/Loader';
import { colors, fonts } from '@hedviginsurance/brand';
import { Spacing } from 'src/components/Spacing';
import { InsuranceStatus } from 'src/features/dashboard/components/InsuranceStatus';
import { PerilCategories } from './components/PerilCategories';
import { DeductibleFootnote } from 'src/features/dashboard/components/DeductibleFootnote';
import { OwnerFootnote } from 'src/features/dashboard/components/OwnerFootnote';
import { InsuranceAmountFootnote } from 'src/features/dashboard/components/InsuranceAmountFootnote';
import { TravelFootnote } from 'src/features/dashboard/components/TravelFootnote';

const DASHBOARD_QUERY = gql`
  query DashboardQuery {
    insurance {
      status
      type
      activeFrom

      perilCategories {
        title
        description
        iconUrl

        perils {
          id
          title
          imageUrl
          description
        }
      }
    }
  }
`;

const Container = styled(ScrollView)({
  flex: 1,
  backgroundColor: colors.OFF_WHITE,
  paddingLeft: 24,
  paddingRight: 24,
});

const Header = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Heading = styled(Text)({
  fontFamily: fonts.MERRIWEATHER,
  color: colors.OFF_BLACK,
  fontSize: 16,
});

const Dashboard = () => (
  <Query query={DASHBOARD_QUERY}>
    {({ loading, error, data }) => {
      if (loading || !data) {
        return <Loader />;
      }

      if (error) {
        console.error(error); // eslint-disable-line no-console
        return <Loader />; // TODO Better error communication
      }

      const { insurance } = data;
      const { status, activeFrom, type, perilCategories } = insurance;

      return (
        <Container>
          <Spacing height={24} />
          <Header>
            <Heading>Min hemförsäkring</Heading>
            <InsuranceStatus status={status} activeFrom={activeFrom} />
          </Header>
          <Spacing height={24} />
          <PerilCategories perilCategories={perilCategories} />
          <Spacing height={24} />
          <DeductibleFootnote />
          <OwnerFootnote type={type} />
          <Spacing height={16} />
          <InsuranceAmountFootnote type={type} />
          <Spacing height={16} />
          <TravelFootnote />
        </Container>
      );
    }}
  </Query>
);

export { Dashboard };
