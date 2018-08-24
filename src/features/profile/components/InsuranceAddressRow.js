import React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileFamilyIcon } from 'src/components/Icon';

const InsuranceAddressRow = ({ address }) => (
  <ProfileRow>
    <ProfileFamilyIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Mitt hem</ProfileRowHeader>
      <ProfileRowText>{address}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { InsuranceAddressRow };
