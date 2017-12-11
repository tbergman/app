import React from "react"
import { View } from "react-native"
import Dashboard from "../../containers/dashboard/Dashboard"
import { NavBar } from "../NavBar"
import {
  StyledCtaArea,
  StyledPriceText,
  StyledPriceComment,
  StyledButtonContainer
} from "../styles/offer"
import {
  TurquoiseRoundedInvertedButton,
  RoundedTransparentButton,
  NavigateBackButton,
  TextButton
} from "../Button"
import { theme } from "hedvig-style"

class Offer extends React.Component {
  componentWillMount() {
    this.props.getInsurance()
  }

  render() {
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <NavBar
          headerLeft={
            <NavigateBackButton onPress={() => this.props.closeModal()} />
          }
        />
        <Dashboard
          navigation={this.props.navigation}
          mode="offer"
          extraScrollViewPadding={160}
        />
        <StyledCtaArea
          source={require("../../../assets/bgs/gradient-white-rectangle.png")}
          resizeMode="stretch"
        >
          <StyledButtonContainer>
            <TurquoiseRoundedInvertedButton
              onPress={() => this.props.checkout()}
              title="Byt till Hedvig"
            />
          </StyledButtonContainer>
          <StyledButtonContainer>
            <TextButton
              onPress={() => this.props.closeModal()}
              title="Jag har en fråga"
            />
          </StyledButtonContainer>
        </StyledCtaArea>
      </View>
    )
  }
}

export default Offer
