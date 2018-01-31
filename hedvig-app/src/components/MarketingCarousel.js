import React from "react"
import { Image, View, Text, Dimensions, AsyncStorage, TouchableOpacity } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import styled from "styled-components/native"
import { connect } from "react-redux"

import {
  StyledHeading,
  StyledSmallText,
  StyledPassiveText
} from "./styles/text"
import { TurquoiseRoundedInvertedButton } from "./Button"
import { ConnectedReduxBaseNavigator } from "../containers/navigation/navigation"
import { StyledButtonText } from "./styles/button";

const { width } = Dimensions.get("window")
const headingFontSize = width <= 320 ? 16 : 24
const paragraphFontSize = width <= 320 ? 10 : 14
const buttonHeight = width <= 320 ? 20 : 40

const contents = [
  {
    heading: "Det ska vara lätt\nnär det är svårt",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/hedvig-marketing-1.png",
    animation: null,
    paragraph: "Hedvig är försäkring för dig,\nditt hem och dina prylar"
  },
  {
    heading: "Anmäl en skada på\n sekunder, få ersättning\n på minuter",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/hedvig-marketing-2.png",
    animation: null,
    paragraph: null
  },
  {
    heading: "Schysst för dig,\noch världen runtomkring",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/hedvig-marketing-3.png",
    animation: null,
    paragraph: "Hedvig är inget vanligt försäkringsbolag.\nVi tar en låg fast avgift, betalar blixtsnabbt\noch skänker överskottet till ett gott ändamål"
  },
  {
    heading: "Tryggat av en av världens\nstörsta återförsäkrings-\nkoncerner",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/hedvig-marketing-4.png",
    animation: null,
    endButton: true,
    paragraph: null
  }
]

const MyStyledHeading = StyledHeading.extend`
  font-size: ${headingFontSize};
  color: ${props => props.theme.colors.blackPurple};
`

const FullScreen = styled.View`
  flex: 1;
  align-self: stretch;
  margin-top: 35px;
`

const Container = FullScreen.extend`
  justify-content: center;
`

const MySmallText = StyledSmallText.extend`
  font-size: ${paragraphFontSize};
  background-color: rgba(0,0,0,0);
  color: ${props => props.theme.colors.darkGray};
  line-height: ${paragraphFontSize + 6};
`

const CenteredText = styled.Text`
  text-align: center;
`

const ImageContainer = styled.View`
  align-self: stretch;
  align-items: center;
  height: ${props => props.height}
`

const ParagraphContainer = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  height: ${paragraphFontSize * 3.5}
  margin: 24px 0 0;
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

const CustomButtonText = StyledButtonText.extend`
  font-size: 14px;
  line-height: 14px;
`

const itemWidth = width <= 320 ? width - 130 : 275

export default class MarketingCarousel extends React.Component {
  state = {
    index: 0
  }

  _renderItem({ item }) {
    if (item.imageUrl) {
      return (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: itemWidth, height: itemWidth }}
        />
      )
    } else if (item.animation) {
      return (
        <View
          style={{
            width: 300,
            height: 300,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {item.animation}
        </View>
      )
    }
  }

  render() {
    let data = contents[this.state.index]
    let maybeEndButton
    if (data.endButton) {
      maybeEndButton = (
        <View style={{height: buttonHeight}}>
          <TurquoiseRoundedInvertedButton
            title="Säg hej till Hedvig!"
            onPress={() => this.props.startChat()}
          />
        </View>
      )
    } else {
      maybeEndButton = (<View style={{height: buttonHeight}} />)
    }
    return (
      <FullScreen>
        <Container>
          {data.heading ? (
              <View style={{minHeight: headingFontSize * 4}}>
                <CenteredText style={{height: headingFontSize * 4}}>
                  <MyStyledHeading>{data.heading}</MyStyledHeading>
                </CenteredText>
              </View>
          ) : null}
          <ImageContainer height={itemWidth}>
            <Carousel
              ref={c => {
                this._carousel = c
              }}s
              data={contents}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={itemWidth}
              inactiveSlideOpacity={0}
              inactiveSlideScale={0.9}
              onSnapToItem={slideIndex => this.setState({ index: slideIndex })}
            />
          </ImageContainer>
          { data.paragraph ? (
            <ParagraphContainer>
              <CenteredText>
                <MySmallText>{data.paragraph}</MySmallText>
              </CenteredText>
            </ParagraphContainer>
          ) : <View style={{height: paragraphFontSize * 3.5, marginTop: 24}} /> }
          {maybeEndButton}
        </Container>
        <View style={{ marginBottom: 20 }}>
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
            <TouchableOpacity onPress={() => this.props.login()}>
              <CustomButtonText>Logga in</CustomButtonText>
            </TouchableOpacity>
          </LoginContainer>
        </View>
      </FullScreen>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => {
      dispatch({
        type: "MARKETING_CAROUSEL/CHAT_LOGIN",
        payload: {
          onSuccess: ownProps.dismiss
        }
      })
    },
    startChat: () => {
      dispatch({
        type: "MARKETING_CAROUSEL/CHAT_START",
        payload: {
          onSuccess: ownProps.dismiss
        }
      })
    }
  }
}

const ConnectedMarketingCarousel = connect(mapStateToProps, mapDispatchToProps)(
  MarketingCarousel
)

const SEEN_MARKETING_CAROUSEL_KEY = "@hedvig:alreadySeenMarketingCarousel"

export class MarketingCarouselOrBaseNavigator extends React.Component {
  state = {
    loading: true,
    alreadySeenMarketingCarousel: false,
    dismissed: false
  }

  async componentWillMount() {
    let alreadySeenMarketingCarousel = await AsyncStorage.getItem(
      SEEN_MARKETING_CAROUSEL_KEY
    )
    this.setState({ alreadySeenMarketingCarousel, loading: false })
  }

  async dismiss() {
    await AsyncStorage.setItem(SEEN_MARKETING_CAROUSEL_KEY, "true")
    this.setState({ dismissed: true })
  }

  render() {
    if (this.state.loading) {
      return <View />
    } else {
      if (
        this.state.alreadySeenMarketingCarousel === "true" ||
        this.state.dismissed
      ) {
        return <ConnectedReduxBaseNavigator />
      } else {
        return <ConnectedMarketingCarousel dismiss={this.dismiss.bind(this)} />
      }
    }
  }
}
