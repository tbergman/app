import * as React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileFamilyIcon } from 'src/components/Icon';

interface InsuranceAddressRowProps {
  address: string
}

const InsuranceAddressRow: React.SFC<InsuranceAddressRowProps> = ({ address }) => (
  <ProfileRow>
    <ProfileFamilyIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Mitt hem</ProfileRowHeader>
      <ProfileRowText>{address}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { InsuranceAddressRow };
