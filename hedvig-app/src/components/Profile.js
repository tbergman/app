import React from "react"
import {
  Text,
  Button,
  View,
  Share,
  ScrollView,
  TouchableOpacity
} from "react-native"
import { Link } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import Placeholder from "rn-placeholder"
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
  StyledRowButton
} from "./styles/list"
import {
  ProfileHeartIcon,
  ProfileFamilyIcon,
  ProfileLockIcon,
  ProfileBankAccountIcon,
  ProfileShareIcon
} from "./Icon"
import { ListNextButton, DisabledListNextButton } from "./Button"
import moment from "moment"
import "moment/locale/sv"
const R = require("ramda")

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Min Profil",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    this.props.getUser()
    this.props.dispatch({ type: "LOADED_CASHBACK_ALTERNATIVES" })
  }

  _userRow({ title, icon, text, secondText = null, onPress = null }) {
    let content = (
      <StyledListElement>
        {icon}
        <StyledListElementTexts>
          <StyledListElementHeading>{title}</StyledListElementHeading>
          <StyledListElementText>{text}</StyledListElementText>
          {secondText && (
            <StyledListElementText>{secondText}</StyledListElementText>
          )}
        </StyledListElementTexts>
        <StyledRowButton>
          <DisabledListNextButton />
        </StyledRowButton>
      </StyledListElement>
    )
    if (onPress) {
      return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
    } else {
      return content
    }
  }

  _maybeFamilyMembers() {
    if (this.props.user.familyMembers) {
      return this._userRow({
        title: "Familjemedlemmar",
        text: R.join(", ", this.props.user.familyMembers),
        onPress: () => this.props.editFamilyMembers()
      })
    }
  }

  _maybePersonalInfo() {
    if (this.props.user.age) {
      return this._userRow({
        title: "Personlig info",
        icon: <ProfileFamilyIcon />,
        text: `${this.props.user.age} år | ${this.props.user.address}`,
        secondText: R.join(", ", this.props.user.familyMembers),
        onPress: () => this.props.editPersonalInfo()
      })
    }
  }

  _safetyIncreasers() {
    const ucFirst = string => string.charAt(0).toUpperCase() + string.slice(1)

    if (this.props.user.safetyIncreasers) {
      return this._userRow({
        title: "Trygghetshöjdare",
        icon: <ProfileLockIcon />,
        text: ucFirst(R.join(", ", this.props.user.safetyIncreasers)),
        onPress: () => this.props.editSafetyIncreasers()
      })
    }
  }

  _maybeBankAccount() {
    if (this.props.user.maskedBankAccountNumber) {
      let paymentStatus = {
        ACTIVE: "aktiv"
      }[this.props.user.paymentStatus]
      let nextPaymentText
      if (this.props.user.paymentStatus === "ACTIVE") {
        nextPaymentText = ` | Nästa dragning ${moment(
          this.props.user.nextPaymentDate
        ).format("D/M")}`
      }
      return this._userRow({
        title: "Bankkonto",
        icon: <ProfileBankAccountIcon />,
        text: this.props.user.maskedBankAccountNumber,
        secondText: `Autogiro ${paymentStatus}${nextPaymentText}`,
        onPress: () => this.props.editBankAccount()
      })
    }
  }

  _maybeSelectedCashback() {
    if (this.props.user.selectedCashback) {
      return this._userRow({
        title: "Välgörenhet",
        icon: <ProfileHeartIcon />,
        text: this.props.user.selectedCashback,
        onPress: () =>
          this.props.navigation.navigate("Carousel", {
            items: this.props.cashbackAlternatives,
            initialSlideIndex: 0,
            renderCta: this._cashbackCarouselCta.bind(this)
          })
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
    if (!item.selected) {
      return (
        <Button
          title="Select"
          onPress={() => this.props.updateCashback(item)}
        />
      )
    }
  }

  _sharePressed() {
    Share.share(
      {
        message:
          "Hedvig är ett modernt försäkringsbolag. Ladda ned Hedvig på AppStore eller Google Play. Läs mer på https://hedvig.com",
        // url: 'https://hedvig.com',
        title: "Hedvig - ett modernt försäkringsbolag"
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
          <StyledCharityParagraph>Överskottet går till</StyledCharityParagraph>
          <StyledCharityImage source={{ uri: "https://unsplash.it/166/48" }} />
          <StyledCharityParagraph>
            {this.props.user.selectedCashbackParagraph}
          </StyledCharityParagraph>
          <StyledCharitySignature>
            {this.props.user.selectedCashbackSignature}
          </StyledCharitySignature>
        </StyledListHeader>
        {/* <Button
          title="Dina försäkringsvillkor"
          onPress={() => this.props.sendPolicyEmail()}
        /> */}
        <StyledList>
          {this._maybeUserInfo()}
          {this._shareRow()}
          <Button title="Logga ut" onPress={() => this.props.logout()} />
        </StyledList>
      </StyledProfileContainer>
    )
  }
}
