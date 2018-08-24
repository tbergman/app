import React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileBankAccountIcon } from 'src/components/Icon';

const PaymentRow = ({ monthlyCost }) => (
  <ProfileRow>
    <ProfileBankAccountIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Min betalning</ProfileRowHeader>
      <ProfileRowText>
        {monthlyCost} kr/månad. Betalas via autogiro
      </ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { PaymentRow };
