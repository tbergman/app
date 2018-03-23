/* global require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Asset } from 'expo';
import { connect } from 'react-redux';

// Precache images
Asset.loadAsync([
  // require("../../assets/identity/hedvig_wordmark/hedvig_wordmark_white.png")
  require('../../assets/onboarding/app-marketing-screen1.png'),
  require('../../assets/onboarding/app-marketing-screen2.png'),
  require('../../assets/onboarding/heart.png'),
  require('../../assets/onboarding/hedvig_gang.png'),
]);

const fonts = {
  CIRCULAR: 'circular',
  MERRIWEATHER: 'merriweather',
};

const colors = {
  PRIMARY_GREEN: '#1BE9B6',
  PRIMARY_BLUE: '#0F007A',
  PRIMARY_PURPLE: '#651EFF',
  TEXT: '#686E7E',
};

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
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);
const hasTallViewport = viewportHeight > 750; // > ~5.5" Screens and above (e.g. iPhone X)
const hasSmallViewport = viewportHeight < 600; // < ~4" Screens and below (e.g. iPhone 5)

const slideStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  figure: {
    flex: 1,
    width: viewportWidth,
    alignItems: 'center',
  },
  caption: {
    fontFamily: fonts.MERRIWEATHER,
    fontSize: viewportWidth <= 320 ? 18 : 20,
    lineHeight: 33,
    textAlign: 'center',
    color: 'black',
    width: viewportWidth,
    paddingTop: hasTallViewport ? 30 : 20,
    paddingBottom: hasTallViewport ? 55 : 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
});

const Slide = ({ title, children }) => (
  <View style={slideStyles.container}>
    <View style={slideStyles.figure}>{children}</View>
    <Text numberOfLines={2} style={slideStyles.caption}>
      {title}
    </Text>
  </View>
);

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

const slideImageWidth = viewportWidth - 60;

const slideImageStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: slideImageWidth,
    position: 'relative',
    top: hasTallViewport ? 90 : viewportHeight > 700 ? 40 : 18,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: hasSmallViewport ? -30 : 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: slideImageWidth,
    resizeMode: Image.resizeMode.contain,
  },
});

const SlideImage = ({ imageSource }) => {
  return (
    <View style={slideImageStyles.container}>
      <Image
        source={imageSource}
        style={slideImageStyles.image}
        resizeMethod={'scale'}
      />
    </View>
  );
};

SlideImage.propTypes = {
  imageSource: PropTypes.number.isRequired,
};

const marketingCarouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  swiperDot: {
    backgroundColor: '#dcdbdc',
    width: 7,
    height: 7,
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
  },
  swiperDotIsActive: {
    backgroundColor: colors.PRIMARY_GREEN,
    width: 7,
    height: 7,
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
  },
  swiperPagination: {
    bottom: 18,
  },
  slideOneContainer: {
    flex: 1,
    alignItems: 'center',
  },
  slideTwoContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BLUE,
  },
  slideThreeContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_PURPLE,
  },
  slideFourContainer: {
    flex: 1,
    backgroundColor: '#FF8A80',
  },
  footerContainer: {
    paddingBottom: hasTallViewport ? 30 : 18,
  },
  footerCtaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: viewportWidth * 0.7,
    minWidth: 250,
    minHeight: 50,
    marginBottom: 18,
    padding: 0,
    backgroundColor: colors.PRIMARY_GREEN,
    borderWidth: 0,
    borderRadius: 27,
  },
  footerCtaButtonText: {
    fontSize: 21,
    fontFamily: fonts.CIRCULAR,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
  },
  footerLoginContainer: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  footerLoginText: {
    fontFamily: fonts.CIRCULAR,
    fontSize: 18,
    lineHeight: 20,
    height: 20,
    color: colors.TEXT,
    marginRight: 8,
  },
  footerLoginCta: {
    fontFamily: fonts.CIRCULAR,
    fontSize: 18,
    lineHeight: 20,
    height: 20,
    color: colors.PRIMARY_PURPLE,
  },
});

export default class MarketingCarousel extends React.Component {
  render() {
    return (
      <View style={marketingCarouselStyles.container}>
        <StatusBar hidden />
        <View style={{ flex: 1 }}>
          <Swiper
            style={{}}
            dot={<View style={marketingCarouselStyles.swiperDot} />}
            activeDot={
              <View style={marketingCarouselStyles.swiperDotIsActive} />
            }
            paginationStyle={marketingCarouselStyles.swiperPagination}
            loop={false}
          >
            <View style={marketingCarouselStyles.slideOneContainer}>
              <Text
                style={{
                  marginTop: hasTallViewport ? 120 : 80,
                  marginBottom: 10,
                  fontSize: hasSmallViewport ? 35 : 45,
                  lineHeight: hasSmallViewport ? 55 : 63,
                  textAlign: 'center',
                  fontFamily: fonts.MERRIWEATHER,
                  color: colors.PRIMARY_BLUE,
                }}
              >
                Livet är{'\n'}lättare med{'\n'}Hedvig
              </Text>
              <Image
                source={require('../../assets/onboarding/hedvig_gang.png')}
                style={{
                  flex: 1,
                  width:
                    viewportWidth *
                    (hasTallViewport ? 0.85 : hasSmallViewport ? 0.65 : 0.7),
                  marginTop: -40,
                  position: 'relative',
                }}
                resizeMode="contain"
              />
            </View>
            <View style={marketingCarouselStyles.slideTwoContainer}>
              <Slide title={'Hemförsäkring för dig\nsom bor i\u00A0lägenhet'}>
                <SlideImage
                  imageSource={require('../../assets/onboarding/app-marketing-screen1.png')}
                />
              </Slide>
            </View>
            <View style={marketingCarouselStyles.slideThreeContainer}>
              <Slide
                title={'Anmäl en skada på sekunder,\nfå betalt på\u00A0minuter'}
              >
                <SlideImage
                  imageSource={require('../../assets/onboarding/app-marketing-screen2.png')}
                />
              </Slide>
            </View>
            <View style={marketingCarouselStyles.slideFourContainer}>
              <Slide title={'Överskottet doneras\ntill ett gott\u00A0ändamål'}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={require('../../assets/onboarding/heart.png')}
                    style={{
                      width: 132,
                      height: 129,
                      resizeMode: Image.resizeMode.contain,
                    }}
                    resizeMethod={'scale'}
                  />
                </View>
              </Slide>
            </View>
          </Swiper>
        </View>

        <View style={marketingCarouselStyles.footerContainer}>
          <TouchableOpacity
            onPress={() => this.props.startChat()}
            style={marketingCarouselStyles.footerCtaButton}
          >
            <Text
              numberOfLines={1}
              style={marketingCarouselStyles.footerCtaButtonText}
            >
              Säg hej till Hedvig
            </Text>
          </TouchableOpacity>
          <View style={marketingCarouselStyles.footerLoginContainer}>
            <View>
              <Text style={marketingCarouselStyles.footerLoginText}>
                Redan medlem?
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.props.login()}>
              <Text style={marketingCarouselStyles.footerLoginCta}>
                Logga in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => {
      dispatch({
        type: 'MARKETING_CAROUSEL/CHAT_LOGIN',
      });
    },
    startChat: () => {
      dispatch({
        type: 'MARKETING_CAROUSEL/CHAT_START',
      });
    },
  };
};

export const ConnectedMarketingCarousel = connect(
  undefined,
  mapDispatchToProps,
)(MarketingCarousel);
