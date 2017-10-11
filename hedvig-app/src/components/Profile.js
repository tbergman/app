import React from "react"
import { Text, Button, View, Share } from "react-native"
import { Link } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import Placeholder from "rn-placeholder"
import styled from "styled-components/native"
const R = require("ramda")

const StyledUserInfo = styled.View`
  flex-direction: row
  align-items: center
`


export default class Profile extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Min Profil",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    this.props.dispatch({ type: "LOADED_USER" })
    this.props.dispatch({ type: "LOADED_CASHBACK_ALTERNATIVES" })
  }

  _userRow(title, text, cta = null) {
    return (
      <View>
        <Text>{title}</Text>
        <StyledUserInfo>
          <Placeholder.Media
            size={70}
            color="lightgray"
            hasRadius
          />
          <Text>{text}</Text>
          {cta}
        </StyledUserInfo>
      </View>
    )
  }

  _familyMembers() {
    let cta = <Button title="Ändra" onPress={() => this.props.editFamilyMembers()} />
    return this._userRow("Familjemedlemmar", R.join(", ", this.props.user.familyMembers), cta)
  }

  _personalInfo() {
    let cta = <Button title="Ändra" onPress={() => this.props.editPersonalInfo()} />
    return this._userRow("Personlig info", `${this.props.user.age} år | ${this.props.user.email}`, cta)
  }

  _livingInfo() {
    let cta = <Button title="Ändra" onPress={() => this.props.editApartmentInfo()} />
    return this._userRow("Boende", `${this.props.user.address} | ${this.props.livingAreaSqm} m2`, cta)
  }

  _bankAccount() {
    let cta = <Button title="Ändra" onPress={() => this.props.editBankAccount()} />
    return this._userRow("Bankkonto", this.props.user.maskedBankAccountNumber, cta)
  }

  _selectedCashback() {
    let cta = <Button title="Ändra" onPress={() => this.props.navigation.navigate("Carousel", {
      items: this.props.cashbackAlternatives,
      initialSlideIndex: 0,
      renderCta: this._cashbackCarouselCta.bind(this)
    })} />
    return this._userRow("Välgörenhet", this.props.user.selectedCashback, cta)
  }

  _cashbackCarouselCta(item) {
    if (!item.selected) {
      return (
        <Button title="Select" onPress={() => this.props.updateCashback(item)} />
      )
    }
  }

  _sharePressed() {
    Share.share({
      message: 'Hedvig är ett modernt försäkringsbolag. Ladda ned Hedvig på AppStore eller Google Play. Läs mer på https://hedvig.com',
      // url: 'https://hedvig.com',
      title: 'Hedvig - ett modernt försäkringsbolag'
    }, {
      // Android only:
      dialogTitle: 'Dela Hedvig',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <Button title="Dina försäkringsvillkor" onPress={() => console.log("Dina försäkringsvillkor pressed")} />
          {!R.isEmpty(this.props.user) && this._familyMembers()}
          {!R.isEmpty(this.props.user) && this._personalInfo()}
          {!R.isEmpty(this.props.user) && this._livingInfo()}
          {!R.isEmpty(this.props.user) && this._bankAccount()}
          {!R.isEmpty(this.props.user) && this._selectedCashback()}
          <Button title="Dela" onPress={() => this._sharePressed()} />
          <Link to="Login" title="Logga ut" />
        </View>
    )
  }
}
