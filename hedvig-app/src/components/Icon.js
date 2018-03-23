/* global require */
import React from 'react';
import { StyledIcon } from './styles/general';

export const Icon = ({ source, size = 'big' }) => {
  let width = {
    small: 16,
    medium: 20,
    mediumBig: 24,
    big: 40,
    huge: 56,
  }[size];
  return <StyledIcon source={source} width={width} height={width} />;
};

export const ProfileHeartIcon = ({ size }) =>
  Icon({ size, source: require('../../assets/icons/profil/valgorenhet.png') });

export const ProfileFamilyIcon = ({ size }) =>
  Icon({
    size,
    source: require('../../assets/icons/profil/personlig_info.png'),
  });

export const ProfileLockIcon = ({ size }) =>
  Icon({
    size,
    source: require('../../assets/icons/profil/trygghetshojare.png'),
  });

export const ProfileBankAccountIcon = ({ size }) =>
  Icon({ size, source: require('../../assets/icons/profil/bankkonto.png') });

export const ProfileShareIcon = ({ size }) =>
  Icon({ size, source: require('../../assets/icons/profil/share.png') });

export const HedvigLogoBlue = () => (
  <StyledIcon
    source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark_blue.png')}
    width={94}
    height={30}
    style={{ justifyContent: 'center' }}
  />
);
