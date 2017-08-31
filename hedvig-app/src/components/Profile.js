import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Min Profil"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna se och ändra information om dig själv" />
        <Link to="ChangePayment" title="Ändra betalmetod" />
        <Link to="ChangeCashback" title="Ändra sätt att få cashback" />
        <Link to="Login" title="Logga ut" />
      </Placeholder>
    )
  }
}
