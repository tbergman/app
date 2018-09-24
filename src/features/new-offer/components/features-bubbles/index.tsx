import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View } from 'react-native';
import { Parallel } from 'src/components/animated';

import { Insured } from 'src/features/new-offer/components/features-bubbles/bubbles/insured';
import { StartDate } from 'src/features/new-offer/components/features-bubbles/bubbles/start-date';
import { Spacing } from 'src/components/Spacing';
import { Payment } from 'src/features/new-offer/components/features-bubbles/bubbles/payment';
import { Deductible } from 'src/features/new-offer/components/features-bubbles/bubbles/deductible';
import { BindingPeriod } from 'src/features/new-offer/components/features-bubbles/bubbles/binding-period';

import { Position } from './position';

const Container = styled(View)({
  height: 325,
  width: 350,
  marginLeft: 35,
  position: 'relative',
});

export const FeaturesBubbles = () => (
  <>
    <Spacing height={35} />
    <Parallel>
      <Container>
        <Position top={190} left="23%">
          <Deductible />
        </Position>
        <Position top={80} left="0%">
          <BindingPeriod />
        </Position>
        <Position top={140} left="46%">
          <Payment />
        </Position>
        <Position top={25} left="47%">
          <StartDate />
        </Position>
        <Position top={0} left="20%">
          <Insured />
        </Position>
      </Container>
    </Parallel>
  </>
);
