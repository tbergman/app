import React from "react"
import { Image, View, Text, Dimensions, AsyncStorage } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import styled from "styled-components/native"
import { connect } from "react-redux"

import StatusBar from "../containers/StatusBar"
import {
  StyledHeading,
  StyledSmallText,
  StyledPassiveText
} from "./styles/text"
import { TextButton, TurquoiseRoundedInvertedButton } from "./Button"
import { ConnectedReduxBaseNavigator } from "../containers/navigation/navigation"
import { types } from "hedvig-redux"

import { UploadingAnimation } from "./Animation"

const contents = [
  {
    heading: "",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_1.png",
    animation: null,
    paragraph:
      ""
  },
  {
    heading: "",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_2.png",
    animation: null,
    paragraph:
      ""
  },
  {
    heading: "",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_3.png",
    animation: null,
    paragraph: ""
  },
  {
    heading: "",
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_4.png",
    animation: null,
    paragraph:
      ""
  },
  {
    heading: null,
    imageUrl: "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig_Marketing_Screens_5.png",
    animation: null,
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
    if (item.imageUrl) {
      return (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 300, height: 300 }}
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
            <TextButton title="Logga in" onPress={() => this.props.login()} />
          </LoginContainer>
        </View>
      </FullScreen>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => {
      dispatch({
        type: types.API,
        payload: {
          url: "/chat/login",
          method: "POST",
          SUCCESS: "MARKETING_CAROUSEL_TRIGGER_LOGIN_SUCCESS"
        }
      })
      ownProps.dismiss()
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
