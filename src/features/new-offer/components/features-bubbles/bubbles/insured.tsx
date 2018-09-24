import * as React from 'react';
import { colors } from '@hedviginsurance/brand';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Spacing } from 'src/components/Spacing';
import { Insurance } from 'src/graphql/types';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const INSURED_TITLE = 'Försäkrade';
const INSURED_SUBTITLE = 'personer';

interface InsuredProps {
  personsInHousehold: number;
}

export const Insured: React.SFC<InsuredProps> = ({ personsInHousehold }) => (
  <BubbleAnimation delay={0}>
    <Bubble width={110} height={110} backgroundColor={colors.PURPLE}>
      <Title>{INSURED_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{`${personsInHousehold} ${INSURED_SUBTITLE}`}</Subtitle>
    </Bubble>
  </BubbleAnimation>
);
