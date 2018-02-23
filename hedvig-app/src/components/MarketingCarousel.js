/* global require */
import React from "react"
import PropTypes from "prop-types"
import {
  View,
  Image,
  Text,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  StatusBar
} from "react-native"
import Swiper from "react-native-swiper";
import { Asset } from "expo"
import { connect } from "react-redux"
import { createReduxBoundAddListener } from "react-navigation-redux-helpers"

import { ConnectedReduxBaseNavigator } from "../containers/navigation/navigation"

// Precache images
Asset.loadAsync([
  // require("../../assets/identity/hedvig_wordmark/hedvig_wordmark_white.png")
  require("../../assets/onboarding/app-marketing-screen1.png"),
  require("../../assets/onboarding/app-marketing-screen2.png"),
  require("../../assets/onboarding/app-marketing-screen3.png"),
  require("../../assets/onboarding/heart.png"),
  require("../../assets/onboarding/hedvig_gang.png"),
])

const fonts = {
  CIRCULAR: "circular",
  MERRIWEATHER: "merriweather",
}

const colors = {
  PRIMARY_GREEN: "#1BE9B6",
  PRIMARY_BLUE: "#0F007A",
  PRIMARY_PURPLE: "#651EFF",
  TEXT: "#686E7E",
}

// Handling different screen sizes with three cases:
// hasTallViewport || hasSmallViewport || (!hasSmallViewport && !hasTallViewport)
//
// iPhone 5 - 8 aspect ratio: 0.56
// Pixel 2 XL aspect ratio: 0.5
// Galaxy S8 aspect ratio: 0.48
// iPhone X aspect ratio: 0.46
//
// Reference
// - https://material.io/devices/
// - https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")
const hasTallViewport = viewportHeight > 750 // > ~5.5" Screens and above (e.g. iPhone X)
const hasSmallViewport = viewportHeight < 600 // < ~4" Screens and below (e.g. iPhone 5)

const Slide = ({ title, children }) => (
  <View style={{
    overflow: "hidden",
    flex: 1,
  }}>
    <View style={{
      flex: 1,
      width: viewportWidth,
      alignItems: "center",
    }}>
      {children}
    </View>
    <Text numberOfLines={2}
      style={{
        fontFamily: fonts.MERRIWEATHER,
        fontSize: viewportWidth <= 320 ? 18 : 20,
        lineHeight: 33,
        textAlign: "center",
        color: "black",
        width: viewportWidth,
        paddingTop: hasTallViewport ? 30 : 20,
        paddingBottom: hasTallViewport ? 55 : 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 20,
      }}>
      {title}
    </Text>
  </View>
)

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

const SlideImage = ({imageSource}) => {
  const slideWidth = viewportWidth - 60
  return (
    <View style={{
      flex: 1,
      width: slideWidth,
      position: "relative",
      top: hasTallViewport ? 90 : (viewportHeight > 700 ? 40 : 18),
      overflow: "hidden",
    }}>
      <Image source={imageSource}
        style={{
          position: "absolute",
          top: hasSmallViewport ? -30 : 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: slideWidth,
          resizeMode: Image.resizeMode.contain,
        }}
        resizeMethod={"scale"}
      />
    </View>
  )
}

SlideImage.propTypes = {
  imageSource: PropTypes.number.isRequired,
}

export default class MarketingCarousel extends React.Component {
  state = {}

  render() {
    return (
      <View style={{
        flex: 1,
        alignSelf: "stretch",
        marginTop: 0,
        backgroundColor: "white",
        justifyContent: "center",
      }}>
        <StatusBar hidden/>
        <View style={{flex: 1}}>
          <Swiper style={{}}
            dot={<View style={{
              backgroundColor: "#dcdbdc",
              width: 7,
              height: 7,
              borderRadius: 7,
              marginLeft: 5,
              marginRight: 5
            }} />}
            activeDot={<View style={{
              backgroundColor: colors.PRIMARY_GREEN,
              width: 7,
              height: 7,
              borderRadius: 7,
              marginLeft: 5,
              marginRight: 5
            }} />}
            paginationStyle={{
              bottom: 18
            }}
            loop={false}>
            <View style={{
              flex: 1,
              alignItems: "center"
            }}>
              <Text style={{
                marginTop: hasTallViewport ? 100 : hasSmallViewport ? 40 : 60,
                marginBottom: hasSmallViewport ? 10 : 15,
                fontSize: hasSmallViewport ? 35 : 40,
                lineHeight: hasSmallViewport ? 47 : 55,
                textAlign: "center",
                fontFamily: fonts.MERRIWEATHER,
                color: colors.PRIMARY_BLUE,
              }}>
                Livet blir{"\n"}enklare med{"\n"}Hedvig
              </Text>
              <Text style={{
                fontSize: 20,
                lineHeight: hasSmallViewport ? 27 : 30,
                textAlign: "center",
                fontFamily: fonts.CIRCULAR,
                color: colors.TEXT,
              }}>
                Försäkring som du aldrig{"\n"}tidigare har upplevt det
              </Text>
                <Image source={require("../../assets/onboarding/hedvig_gang.png")}
                  style={{
                    flex: 1,
                    width: viewportWidth * (hasTallViewport ? 0.85 : hasSmallViewport ? 0.65 : 0.70),
                    marginTop: -40,
                    position: "relative"
                  }}
                  resizeMode="contain"
                />
            </View>
            <View style={{ flex: 1, backgroundColor: colors.PRIMARY_BLUE }}>
              <Slide title={"Hedvig är hemförsäkring\nskapad för\u00A0dig"}>
                <SlideImage
                  imageSource={require("../../assets/onboarding/app-marketing-screen1.png")}/>
              </Slide>
            </View>
            <View style={{ flex: 1, backgroundColor: colors.PRIMARY_PURPLE }}>
              <Slide title={"Om något hänt får du\nhjälp på\u00A0sekunder"}>
                <SlideImage
                  imageSource={require("../../assets/onboarding/app-marketing-screen2.png")}/>
              </Slide>
            </View>
            <View style={{ flex: 1, backgroundColor: colors.PRIMARY_GREEN }}>
              <Slide title={"Logga dina prylar och se\nexakt hur de är\u00A0försäkrade"}>
                <SlideImage
                  imageSource={require("../../assets/onboarding/app-marketing-screen3.png")}/>
              </Slide>
            </View>
            <View style={{ flex: 1, backgroundColor: "#FF8A80" }}>
              <Slide title={"Det som blir över när alla skador\när betalda går till välgörenhet"}>
                <View style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Image source={require("../../assets/onboarding/heart.png")}
                    style={{
                      width: 132,
                      height: 129,
                      resizeMode: Image.resizeMode.contain,
                    }}
                    resizeMethod={"scale"}
                  />
                </View>
              </Slide>
            </View>
          </Swiper>
        </View>

        <View style={{ paddingBottom: hasTallViewport ? 30 : 18 }}>
          <TouchableOpacity onPress={() => this.props.startChat()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              maxWidth: viewportWidth * 0.7,
              minWidth: 250,
              minHeight: 50,
              marginBottom: 18,
              padding: 0,
              backgroundColor: colors.PRIMARY_GREEN,
              borderWidth: 0,
              borderRadius: 27,
            }}>
            <Text numberOfLines={1}
            style={{
              fontSize: 21,
              fontFamily: fonts.CIRCULAR,
              textAlignVertical: "center",
              textAlign: "center",
              color: "white"
            }}>Kolla ditt pris</Text>
          </TouchableOpacity>
          <View style={{
            marginTop: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}>
            <View>
              <Text style={{
                fontFamily: fonts.CIRCULAR,
                fontSize: 18,
                lineHeight: 20,
                height: 20,
                color: colors.TEXT,
                marginRight: 8,
              }}>Redan medlem?</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.login()}>
              <Text style={{
                fontFamily: fonts.CIRCULAR,
                fontSize: 18,
                lineHeight: 20,
                height: 20,
                color: colors.PRIMARY_PURPLE,
              }}>Logga in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

  constructor(props) {
    super(props)

    this.addListener = createReduxBoundAddListener("root")
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
        return <ConnectedReduxBaseNavigator addListener={this.addListener} />
      } else {
        return <ConnectedMarketingCarousel dismiss={this.dismiss.bind(this)} />
      }
    }
  }
}
