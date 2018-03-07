import React from "react"
import {
  View,
  Share,
} from "react-native"
import { NavigationActions } from 'react-navigation'
import { HeaderRightChat } from "./NavBar"
import {
  StyledProfileContainer,
  StyledCharityImage,
  StyledCharityParagraph,
  StyledCharitySignature
} from "./styles/profile"
import {
  StyledListHeader,
  StyledList,
  StyledListElement,
  StyledListElementTexts,
  StyledListElementHeading,
  StyledListElementText,
  StyledRowButton,
  TouchableStyledListElement
} from "./styles/list"
import {
  ProfileHeartIcon,
  ProfileFamilyIcon,
  ProfileLockIcon,
  ProfileBankAccountIcon,
  ProfileShareIcon
} from "./Icon"
import {
  DisabledListNextButton,
  RoundedButton,
  TurquoiseRoundedInvertedButton
} from "./Button"
import "moment/locale/sv"
import * as R from "ramda"

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Min Profil",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    this.props.getUser()
    this.props.getCashbackAlternatives()
    this.props.getInsurance()
  }

  _userRow({ title, icon, text, secondText = null, onPress = null }) {
    let ListElementComponent = onPress
      ? TouchableStyledListElement
      : StyledListElement
    let maybeButton = onPress ? (
      <StyledRowButton>
        <DisabledListNextButton />
      </StyledRowButton>
    ) : null
    return (
      <ListElementComponent onPress={onPress}>
        {icon}
        <StyledListElementTexts>
          <StyledListElementHeading>{title}</StyledListElementHeading>
          <StyledListElementText>{text}</StyledListElementText>
          {secondText ? (
            <StyledListElementText>{secondText}</StyledListElementText>
          ): null}
        </StyledListElementTexts>
        {maybeButton}
      </ListElementComponent>
    )
  }

  _maybeFamilyMembers() {
    if (this.props.user.familyMembers) {
      return this._userRow({
        title: "Familjemedlemmar",
        text: R.join(", ", this.props.user.familyMembers)
        // Disabled profile actions
        // onPress: () => this.props.editFamilyMembers()
      })
    }
  }

  _maybePersonalInfo() {
    if (this.props.user.age) {
      return this._userRow({
        title: "Personlig info",
        icon: <ProfileFamilyIcon />,
        text: `${this.props.user.age} år | ${this.props.user.address}`,
        secondText: R.join(", ", this.props.user.familyMembers)
      })
    }
  }

  _safetyIncreasers() {
    const ucFirst = string => string.charAt(0).toUpperCase() + string.slice(1)

    if (this.props.user.safetyIncreasers) {
      return this._userRow({
        title: "Mina trygghetshöjare",
        icon: <ProfileLockIcon />,
        text: ucFirst(R.join(", ", this.props.user.safetyIncreasers))
        // Disabled profile actions
        // onPress: () => this.props.editSafetyIncreasers()
      })
    }
  }

  _maybeBankAccount() {
    if (this.props.user.maskedBankAccountNumber) {
      return this._userRow({
        title: "Min betalning",
        icon: <ProfileBankAccountIcon />,
        text: `${this.props.insurance.currentTotalPrice} kr/månad. ${this.props.user.maskedBankAccountNumber}`,
        secondText: "",
        // onPress: () => this.props.navigation.navigate("Payment")
      })
    }
  }

  _maybeSelectedCashback() {
    if (this.props.user.selectedCashback) {
      return this._userRow({
        title: "Min välgörenhet",
        icon: <ProfileHeartIcon />,
        text: this.props.user.selectedCashback,
        // Cashback click removed for now as we only have one cashback. Will be re-added later
        // onPress: () =>
        //   this.props.navigation.navigate("Carousel", {
        //     items: this.props.cashbackAlternatives,
        //     title: "Välgörenhet",
        //     initialSlideIndex: 0,
        //     renderCta: this._cashbackCarouselCta.bind(this)
        //   })
      })
    }
  }

  _shareRow() {
    return this._userRow({
      title: "Rekommendera en vän",
      icon: <ProfileShareIcon />,
      text: "Låt Hedvig förenkla vardagen för någon du bryr dig om",
      onPress: () => this._sharePressed()
    })
  }

  _cashbackCarouselCta(item) {
    if (item.selected) {
      let title = item.charity ? "Tack för ditt bidrag" : "Ditt val"
      return <TurquoiseRoundedInvertedButton title={title} disabled={true} />
    } else {
      return (
        <RoundedButton
          title={`Stöd ${item.name}`}
          onPress={() => this.props.updateCashback(item, () => NavigationActions.navigate({ routeName: "ProfileTab" }))}
        />
      )
    }
  }

  _sharePressed() {
    Share.share(
      {
        message:
          "Livet är enklare med Hedvig. Ladda ner appen på AppStore eller Google Play. Läs mer på https://www.hedvig.com",
        title: "Hedvig är försäkring som du aldrig tidigare har upplevt det"
      },
      {
        // Android only:
        dialogTitle: "Dela Hedvig",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    )
  }

  _maybeUserInfo() {
    if (this.props.user) {
      return (
        <View>
          {this._maybeSelectedCashback()}
          {this._maybePersonalInfo()}
          {this._safetyIncreasers()}
          {this._maybeBankAccount()}
        </View>
      )
    }
  }

  render() {
    return (
      <StyledProfileContainer>
        <StyledListHeader>
          <StyledCharityParagraph>Du stödjer</StyledCharityParagraph>
          <StyledCharityImage
            source={{ uri: this.props.user.selectedCashbackImageUrl }}
          />
          <StyledCharityParagraph>
            {this.props.user.selectedCashbackParagraph}
          </StyledCharityParagraph>
          <StyledCharitySignature>
            {this.props.user.selectedCashbackSignature}
          </StyledCharitySignature>
        </StyledListHeader>
        <StyledList>
          {this._maybeUserInfo()}
          <RoundedButton title="Logga ut" onPress={() => this.props.logout()} style={{marginTop: 8, marginBottom: 24}}/>
        </StyledList>
      </StyledProfileContainer>
    )
  }
}
