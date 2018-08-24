import React from 'react';
import { Image, Text } from 'react-native';
import styled from '@emotion/primitives';

import { fonts, colors } from '@hedviginsurance/brand';

const Icon = styled(Image)({
  marginRight: 5,
  width: 16,
  height: 16,
});

const StatusText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.DARK_GRAY,
  fontSize: 14,
});

const InsuranceStatus = ({ status, activeFrom }) => (
  <React.Fragment>
    <Icon
      source={
        {
          ACTIVE: require('assets/icons/my_insurance/aktiv.png'),
          INACTIVE_WITH_START_DATE: require('assets/icons/my_insurance/startdatum_idle.png'),
          INACTIVE: require('assets/icons/edit_perils/added_peril.png'),
        }[status]
      }
    />
    <StatusText>
      {
        {
          ACTIVE: 'Aktiv',
          INACTIVE_WITH_START_DATE: `Aktiveras ${activeFrom}`,
          INACTIVE: 'Inaktiv',
        }[status]
      }
    </StatusText>
  </React.Fragment>
);

export { InsuranceStatus };
