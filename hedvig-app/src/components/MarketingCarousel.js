import React from "react"
import { Image, View, Text, Dimensions, AsyncStorage } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import styled from "styled-components/native"
import { connect } from "react-redux"

import {
  StyledHeading,
  StyledSmallText,
  StyledPassiveText
} from "./styles/text"
import { TextButton, TurquoiseRoundedInvertedButton } from "./Button"
import { ConnectedReduxBaseNavigator } from "../containers/navigation/navigation"

const contents = [
  {
    heading: "Livet är enklare\nmed Hedvig",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_1.png",
    animation: null,
    paragraph: "Hedvig är försäkring för\ndig, ditt hem och dina prylar"
  },
  {
    heading: "Anmäl en skada på\n sekunder, få ersättning\n på minuter",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_2_bigger.png",
    animation: null,
    paragraph: null
  },
  {
    heading: "Schysst för dig.\nSchysst för din omvärld",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_4.png",
    animation: null,
    paragraph: "Pengarna som blir över när Hedvig ersatt\nalla skador går till organisationer som gör skillnad"
  },
  {
    heading: "Tryggat av en av världens\nstörsta återförsäkrings-\nkoncerner",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_6_smaller.png",
    animation: null,
    endButton: true,
    paragraph: null
  }
]

const MyStyledHeading = StyledHeading.extend`
  font-size: 22px;
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
  font-size: 14px;
  background-color: rgba(0,0,0,0);
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

const { width } = Dimensions.get("window")
const itemWidth = width < 375 ? width - 100 : 275

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
        <View>
          <TurquoiseRoundedInvertedButton
            title="Säg hej till Hedvig!"
            onPress={() => this.props.startChat()}
          />
        </View>
      )
    }
    return (
      <FullScreen>
        <Container>
          {data.heading ? (
            <CenteredText>
              <MyStyledHeading>{data.heading}</MyStyledHeading>
            </CenteredText>
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
          {maybeEndButton}
          { data.paragraph ? (
            <ParagraphContainer>
              <CenteredText>
                <MySmallText>{data.paragraph}</MySmallText>
              </CenteredText>
            </ParagraphContainer>
          ) : null }
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
            <TextButton title="Logga in" onPress={() => this.props.login()} />
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
