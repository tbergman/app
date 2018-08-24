import React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileLockIcon } from 'src/components/Icon';

const SafetyIncreasersRow = ({ safetyIncreasers }) => (
  <ProfileRow>
    <ProfileLockIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Mina trygghetshöjare</ProfileRowHeader>
      <ProfileRowText>{safetyIncreasers.join(', ')}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { SafetyIncreasersRow };
