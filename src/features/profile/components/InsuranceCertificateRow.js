import React from 'react';
import { Linking } from 'react-native';

import {
  TouchableProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileCertificateIcon } from 'src/components/Icon';

const InsuranceCertificateRow = ({ certificateUrl }) => (
  <TouchableProfileRow onPress={() => Linking.openURL(certificateUrl)}>
    <ProfileCertificateIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Mitt försäkringsbrev</ProfileRowHeader>
      <ProfileRowText>Tryck för att läsa</ProfileRowText>
    </ProfileRowTextContainer>
  </TouchableProfileRow>
);

export { InsuranceCertificateRow };
