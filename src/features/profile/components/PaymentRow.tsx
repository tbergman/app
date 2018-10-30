import * as React from 'react';
import { Navigation } from 'react-native-navigation';

import { PAYMENT_SCREEN } from 'src/navigation/screens/payment';
import {
  TouchableProfileRow,
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileBankAccountIcon } from 'src/components/Icon';

interface PaymentRowProps {
  monthlyCost: number;
}

const PaymentRow: React.SFC<PaymentRowProps> = ({ monthlyCost }) => (
  <TouchableProfileRow
    onPress={() =>
      Navigation.showModal({
        stack: {
          children: [PAYMENT_SCREEN],
        },
      })
    }
  >
    <ProfileBankAccountIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Min betalning</ProfileRowHeader>
      <ProfileRowText>
        {monthlyCost} kr/månad. Betalas via autogiro
      </ProfileRowText>
    </ProfileRowTextContainer>
  </TouchableProfileRow>
);

export { PaymentRow };
