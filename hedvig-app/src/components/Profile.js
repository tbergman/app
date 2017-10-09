import React from "react"
import { Text, Button, View } from "react-native"
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
    let cta = <Button title="Ändra" onPress={() => console.log("Ändra Familjemedlemmar pressed")} />
    return this._userRow("Familjemedlemmar", R.join(", ", this.props.user.familyMembers), cta)
  }

  _personalInfo() {
    let cta = <Button title="Ändra" onPress={() => console.log("Ändra Personlig info pressed")} />
    return this._userRow("Personlig info", `${this.props.user.age} år | ${this.props.user.email}`, cta)
  }

  _livingInfo() {
    let cta = <Button title="Ändra" onPress={() => console.log("Ändra Boende pressed")} />
    return this._userRow("Boende", `${this.props.user.address} | ${this.props.livingAreaSqm} m2`, cta)
  }

  _bankAccount() {
    let cta = <Button title="Ändra" onPress={() => console.log("Ändra Bankkonto info pressed")} />
    return this._userRow("Bankkonto", this.props.user.maskedBankAccountNumber, cta)
  }

  _selectedCashback() {
    let cta = <Button title="Ändra" onPress={() => this.props.navigation.navigate("Carousel", {
      items: this.props.cashbackAlternatives,
      initialSlideIndex: 0
    })} />
    return this._userRow("Välgörenhet", this.props.user.selectedCashback, cta)
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
          <Link to="Login" title="Logga ut" />
        </View>
    )
  }
}
