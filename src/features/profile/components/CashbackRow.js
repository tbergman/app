import React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileHeartIcon } from 'src/components/Icon';

const CashbackRow = ({ name }) => (
  <ProfileRow>
    <ProfileHeartIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Min välgörenhet</ProfileRowHeader>
      <ProfileRowText>{name}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { CashbackRow };
