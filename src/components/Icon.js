/* global require */
import React from 'react';
import { StyledIcon } from './styles/general';

class Icon extends React.Component {
  static defaultProps = { size: 'big' };
  render() {
    const { source, size } = this.props;
    const width = {
      small: 16,
      medium: 20,
      mediumBig: 24,
      big: 40,
      huge: 56,
    }[size];

    return <StyledIcon source={source} width={width} height={width} />;
  }
}

export class ProfileHeartIcon extends React.Component {
  render() {
    const { size } = this.props;
    return (
      <Icon
        size={size}
        source={require('../../assets/icons/profil/valgorenhet.png')}
      />
    );
  }
}

export class ProfileFamilyIcon extends React.Component {
  render() {
    const { size } = this.props;
    return (
      <Icon
        size={size}
        source={require('../../assets/icons/profil/personlig_info.png')}
      />
    );
  }
}

export class ProfileLockIcon extends React.Component {
  render() {
    const { size } = this.props;
    return (
      <Icon
        size={size}
        source={require('../../assets/icons/profil/trygghetshojare.png')}
      />
    );
  }
}

export class ProfileBankAccountIcon extends React.Component {
  render() {
    const { size } = this.props;
    return (
      <Icon
        size={size}
        source={require('../../assets/icons/profil/bankkonto.png')}
      />
    );
  }
}

export const ProfileCertificateIcon = () => (
  <Icon
    size={40}
    source={require('../../assets/icons/profil/insurance-certificate.png')}
  />
);
