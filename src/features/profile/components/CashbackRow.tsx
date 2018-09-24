import * as React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from 'src/features/profile/components/ProfileRow';
import { ProfileHeartIcon } from 'src/components/Icon';

interface CashbackRowProps {
  name: string
}

const CashbackRow: React.SFC<CashbackRowProps> = ({ name }) => (
  <ProfileRow>
    <ProfileHeartIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Min välgörenhet</ProfileRowHeader>
      <ProfileRowText>{name}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { CashbackRow };
