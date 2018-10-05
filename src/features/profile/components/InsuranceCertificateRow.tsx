import * as React from 'react';
import { Linking } from 'react-native';

import {
  TouchableProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileCertificateIcon } from 'src/components/Icon';

interface InsuranceCertificateRowProps {
  certificateUrl?: string
}

const InsuranceCertificateRow: React.SFC<InsuranceCertificateRowProps> = ({ certificateUrl }) =>
  certificateUrl ? (
    <TouchableProfileRow onPress={() => Linking.openURL(certificateUrl)}>
      <ProfileCertificateIcon />
      <ProfileRowTextContainer>
        <ProfileRowHeader>Mitt försäkringsbrev</ProfileRowHeader>
        <ProfileRowText>Tryck för att läsa</ProfileRowText>
      </ProfileRowTextContainer>
    </TouchableProfileRow>
  ) : null;

export { InsuranceCertificateRow };
