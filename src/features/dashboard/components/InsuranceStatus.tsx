import * as React from 'react';
import { View, Image, Text } from 'react-native';
import styled from '@sampettersson/primitives';

import { fonts, colors } from '@hedviginsurance/brand';
import { InsuranceStatus } from 'src/graphql/types';

interface InsuranceStatusProps {
  status: InsuranceStatus;
  activeFrom: string;
}

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

const Container = styled(View)({
  flexDirection: 'row',
});

const icons = {
  ACTIVE: require('assets/icons/my_insurance/aktiv.png'),
  INACTIVE_WITH_START_DATE: require('assets/icons/my_insurance/startdatum_idle.png'),
  INACTIVE: require('assets/icons/edit_perils/added_peril.png'),
};

const getIcon = (status: InsuranceStatus) => {
  switch (status) {
    case 'ACTIVE':
      return icons.ACTIVE;
    case 'INACTIVE_WITH_START_DATE':
      return icons.INACTIVE_WITH_START_DATE;
    case 'INACTIVE':
      return icons.INACTIVE;
  }
};

const getStatusText = (status: InsuranceStatus, activeFrom: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'Aktiv';
    case 'INACTIVE_WITH_START_DATE':
      return `Aktiveras ${activeFrom}`;
    case 'INACTIVE':
      return 'Inaktiv';
  }
};

const InsuranceStatusDisplay: React.SFC<InsuranceStatusProps> = ({
  status,
  activeFrom,
}) => (
  <Container>
    <Icon source={getIcon(status)} />
    <StatusText>{getStatusText(status, activeFrom)}</StatusText>
  </Container>
);

export { InsuranceStatusDisplay };
