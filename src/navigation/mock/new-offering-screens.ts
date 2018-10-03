import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { client } from 'src/graphql/client';
import { Insurance } from 'src/graphql/types';
import uuid from 'uuid/v1';
import gql from 'graphql-tag';

const QUERY = gql`
  query OfferingScreenMock {
    insurance {
      insuredAtOtherCompany
      personsInHousehold
      monthlyCost
      address
      presaleInformationUrl
      currentInsurerName
      policyUrl
      status
      activeFrom
      type
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

export const getNewOfferingScreensLayout = async () => {
  await client.writeQuery<{ insurance: Insurance }>({
    query: QUERY,
    data: {
      insurance: {
        insuredAtOtherCompany: true,
        personsInHousehold: 2,
        monthlyCost: 129,
        address: 'Mockgatan 12',
        certificateUrl: '',
        presaleInformationUrl: '',
        currentInsurerName: 'IF',
        policyUrl: '',
        status: 'PENDING',
        activeFrom: new Date().toString(),
        type: 'RENT',
        perilCategories: [
          {
            title: 'Test',
            description: '',
            iconUrl: '',
            perils: [
              {
                id: uuid(),
                title: 'Test',
                imageUrl: '',
                description: 'mock',
                __typename: 'Peril',
              },
            ],
            __typename: 'PerilCategory',
          },
          {
            title: 'Test',
            description: '',
            iconUrl: '',
            perils: [
              {
                id: uuid(),
                title: 'Test',
                imageUrl: '',
                description: 'mock',
                __typename: 'Peril',
              },
            ],
            __typename: 'PerilCategory',
          },
          {
            title: 'Test',
            description: '',
            iconUrl: '',
            perils: [
              {
                id: uuid(),
                title: 'Test',
                imageUrl: '',
                description: 'mock',
                __typename: 'Peril',
              },
            ],
            __typename: 'PerilCategory',
          },
          {
            title: 'Test',
            description: '',
            iconUrl: '',
            perils: [
              {
                id: uuid(),
                title: 'Test',
                imageUrl: '',
                description: 'mock',
                __typename: 'Peril',
              },
            ],
            __typename: 'PerilCategory',
          },
        ],
        __typename: 'Insurance',
      },
    },
  });

  return {
    root: {
      stack: {
        children: [NEW_OFFER_SCREEN],
      },
    },
  };
};
