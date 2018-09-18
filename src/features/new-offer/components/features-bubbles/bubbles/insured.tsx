import * as React from 'react';
import { colors } from '@hedviginsurance/brand';
import { Spring } from 'src/components/animated';

import { Spacing } from 'src/components/Spacing';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Position } from '../position';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';
import { Checkmark } from 'src/components/icons/Checkmark';

const INSURED_TITLE = 'Försäkrade';
const INSURED_SUBTITLE = '2 personer';

export const Insured = () => (
  <BubbleAnimation delay={0}>
    <Bubble width={110} height={110} backgroundColor={colors.PURPLE}>
      <Title>{INSURED_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{INSURED_SUBTITLE}</Subtitle>
    </Bubble>
    <Position top={0} left={0}>
      <Spring
        delay={1200}
        bounciness={12}
        toValue={1}
        initialValue={0}
        mapStyles={(animatedValue) => ({
          transform: [{ scale: animatedValue }],
        })}
      >
        <Bubble width={25} height={25} backgroundColor={colors.GREEN}>
          <Checkmark
            width={12.5}
            height={12.5}
            checkmarkFillColor={colors.WHITE}
          />
        </Bubble>
      </Spring>
    </Position>
  </BubbleAnimation>
);
