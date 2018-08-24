import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  StyledProfileContainer,
  StyledCharityParagraph,
  StyledCharitySignature,
} from './styles/profile';
import {
  StyledListHeader,
  StyledList,
  StyledListElement,
  StyledListElementTexts,
  StyledListElementHeading,
  StyledListElementText,
  StyledRowButton,
  TouchableStyledListElement,
} from './styles/list';
import {
  ProfileHeartIcon,
  ProfileFamilyIcon,
  ProfileLockIcon,
  ProfileBankAccountIcon,
} from './Icon';
import { DisabledListNextButton } from './Button';
import { Loader } from './Loader';
import * as R from 'ramda';
import { StyledButtonText } from './styles/button';
import { Spacing } from './Spacing';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  cashbackImage: {
    width: 300,
    marginTop: 8,
    marginBottom: 16,
  },
  certificateImage: { width: 40, height: 40 },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    backgroundColor: colors.WHITE,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

class LogoutButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.logoutButton}
      >
        <StyledButtonText>Logga ut</StyledButtonText>
      </TouchableOpacity>
    );
  }
}

export default class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getCashbackAlternatives();
    this.props.getInsurance();
  }

  _userRow({ title, icon, text, secondText = null, onPress = null }) {
    let ListElementComponent = onPress
      ? TouchableStyledListElement
      : StyledListElement;
    let maybeButton = onPress ? (
      <StyledRowButton>
        <DisabledListNextButton />
      </StyledRowButton>
    ) : null;
    return (
      <ListElementComponent onPress={onPress}>
        {icon}
        <StyledListElementTexts>
          <StyledListElementHeading>{title}</StyledListElementHeading>
          <StyledListElementText>{text}</StyledListElementText>
          {secondText ? (
            <StyledListElementText>{secondText}</StyledListElementText>
          ) : null}
        </StyledListElementTexts>
        {maybeButton}
      </ListElementComponent>
    );
  }

  _maybePersonalInfo() {
    if (this.props.user.age) {
      return this._userRow({
        title: 'Personlig info',
        icon: <ProfileFamilyIcon />,
        text: `${this.props.user.age} år | ${this.props.user.address}`,
        secondText: R.join(', ', this.props.user.familyMembers),
      });
    }
  }

  _safetyIncreasers() {
    const ucFirst = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);
    const safetyIncreasers = R.join(
      ', ',
      this.props.user.safetyIncreasers || [],
    );

    if (safetyIncreasers) {
      return this._userRow({
        title: 'Mina trygghetshöjare',
        icon: <ProfileLockIcon />,
        text: ucFirst(safetyIncreasers),
      });
    }
  }

  _maybeBankAccount() {
    if (this.props.user.maskedBankAccountNumber) {
      return this._userRow({
        title: 'Min betalning',
        icon: <ProfileBankAccountIcon />,
        text: `${this.props.insurance.currentTotalPrice} kr/månad. ${
          this.props.user.maskedBankAccountNumber
        }`,
        secondText: '',
        // onPress: () => this.props.navigation.navigate("Payment")
      });
    }
  }

  _maybeSelectedCashback() {
    if (this.props.user.selectedCashback) {
      return this._userRow({
        title: 'Min välgörenhet',
        icon: <ProfileHeartIcon />,
        text: this.props.user.selectedCashback,
      });
    }
  }

  _maybeCertificate() {
    const { certificateUrl } = this.props.insurance;
    if (certificateUrl) {
      return this._userRow({
        title: 'Mitt försäkringsbrev',
        icon: (
          <Image
            style={styles.certificateImage}
            source={require('../../assets/icons/profil/insurance-certificate.png')}
          />
        ),
        text: 'Tryck för att läsa',
        onPress: () => Linking.openURL(certificateUrl),
      });
    }
  }

  _maybeUserInfo() {
    if (this.props.user) {
      return (
        <View>
          {this._maybeSelectedCashback()}
          {this._maybePersonalInfo()}
          {this._safetyIncreasers()}
          {this._maybeBankAccount()}
          {this._maybeCertificate()}
        </View>
      );
    }
  }

  _logout = () => {
    this.props.logout();
  };

  render() {
    // WARNING: Change this to loading state based on the request or something
    // more robust
    if (!this.props.user || !this.props.user.address) {
      return <Loader />;
    }

    // Barncancerfonden logo is almost a square so we need to adjust height
    // compared to SOS barnbyar which is more widescreen (should be default)
    let cashbackImageHeight =
      {
        Barncancerfonden: 100,
      }[this.props.user.selectedCashback] || 50;

    return (
      <StyledProfileContainer>
        <StyledList>
          <StyledListHeader>
            <Image
              source={{ uri: this.props.user.selectedCashbackImageUrl }}
              resizeMode="contain"
              style={[
                styles.cashbackImage,
                {
                  height: cashbackImageHeight,
                },
              ]}
            />
            <StyledCharityParagraph>
              {this.props.user.selectedCashbackParagraph}
            </StyledCharityParagraph>
            <StyledCharitySignature>
              {this.props.user.selectedCashbackSignature}
            </StyledCharitySignature>
          </StyledListHeader>
          {this._maybeUserInfo()}
          <Spacing height={15} />
          <LogoutButton onPress={this._logout} />
        </StyledList>
      </StyledProfileContainer>
    );
  }
}
