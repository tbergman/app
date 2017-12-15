import React from "react"
import { Image, View, Text, Dimensions } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import styled from "styled-components/native"

import StatusBar from "../containers/StatusBar"
import {
  StyledHeading,
  StyledSmallText,
  StyledPassiveText
} from "./styles/text"
import { TextButton, TurquoiseRoundedInvertedButton } from "./Button"
import { ConnectedReduxBaseNavigator } from "../containers/navigation/navigation"

const contents = [
  {
    heading: "Det ska vara lätt\n när det är svårt",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Därför har vi gjort om försäkring från grunden, \nför dig, ditt hem & dina prylar. Dra till vänster för att\n upptäcka Sveriges första AI-hemförsäkring."
  },
  {
    heading: "Anmäl en skada på\n sekunder, få ersättning\n på minuter",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Chatta med Hedvig när som helst\n så får du svar & hjälp direkt."
  },
  {
    heading: "Se exakt hur dina prylar\n är försäkrade",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph: "Fota dina saker eller kvitton\n så håller Hedvig koll åt dig."
  },
  {
    heading: "Det som inte\n betalas ut i ersättning\n ges till välgörenhet",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Välj vilken organisation du vill stödja\n genom din Hedvig-försäkring."
  },
  {
    heading: null,
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    endButton: true,
    paragraph: "Klicka för att få ett skräddarsytt \nförsäkringsförslag."
  }
]

const MyStyledHeading = StyledHeading.extend`
  font-size: 24px;
`

const FullScreen = styled.View`
  flex: 1;
  align-self: stretch;
`

const Container = FullScreen.extend``

const MySmallText = StyledSmallText.extend`
  font-size: 14px;
`

const CenteredText = styled.Text`
  text-align: center;
`

const ImageContainer = styled.View`
  margin-top: 20px;
  align-self: stretch;
  align-items: center;
  height: 300px;
`

const ParagraphContainer = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const DotsContainer = styled.View`
  margin-top: 0px;
  align-items: center;
`

const LoginContainer = styled.View`
  margin-top: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default class MarketingCarousel extends React.Component {
  state = {
    index: 0
  }

  _renderItem({ item, index }) {
    // TODO Render either an Image or a Lottie animation here, based on
    // which of item.imageUrl and item.animationUrl is not null
    return (
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 300, height: 300 }}
      />
    )
  }

  render() {
    let data = contents[this.state.index]
    let maybeEndButton
    if (data.endButton) {
      maybeEndButton = (
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <TurquoiseRoundedInvertedButton
            title="Säg hej till Hedvig!"
            onPress={() => this.props.dismiss()}
          />
        </View>
      )
    }
    return (
      <FullScreen>
        <StatusBar />
        <Container>
          {data.heading ? (
            <CenteredText>
              <MyStyledHeading>{data.heading}</MyStyledHeading>
            </CenteredText>
          ) : null}
          <ImageContainer>
            <Carousel
              ref={c => {
                this._carousel = c
              }}
              data={contents}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={300}
              inactiveSlideOpacity={0}
              inactiveSlideScale={0.9}
              onSnapToItem={slideIndex => this.setState({ index: slideIndex })}
            />
          </ImageContainer>
          <ParagraphContainer>
            {maybeEndButton}
            <CenteredText>
              <MySmallText>{data.paragraph}</MySmallText>
            </CenteredText>
          </ParagraphContainer>
        </Container>
        <View style={{ marginBottom: 40 }}>
          <DotsContainer>
            <Pagination
              dotsLength={contents.length}
              activeDotIndex={this.state.index}
              dotColor="#651EFF"
              inactiveDotColor="#D7D7DC"
              inactiveDotScale={1}
            />
          </DotsContainer>
          <LoginContainer>
            <Text style={{ marginRight: 10 }}>
              <StyledPassiveText>Redan medlem?</StyledPassiveText>
            </Text>
            <TextButton title="Logga in" onPress={() => this.props.dismiss()} />
          </LoginContainer>
        </View>
      </FullScreen>
    )
  }
}

export class MarketingCarouselOrBaseNavigator extends React.Component {
  state = {
    dismissed: false
  }

  render() {
    if (this.state.dismissed) {
      return <ConnectedReduxBaseNavigator />
    } else {
      return (
        <MarketingCarousel dismiss={() => this.setState({ dismissed: true })} />
      )
    }
  }
}
