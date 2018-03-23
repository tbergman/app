import React from 'react';
import { View, Dimensions, BackHandler, Image } from 'react-native';
import { WebBrowser } from 'expo';
import { default as SnapCarousel } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  StyledCarouselContainer,
  StyledAlignedCarouselItems,
  StyledImageCarouselContainer,
  StyledCarouselHeading,
  StyledCarouselTexts,
  StyledCarouselParagraph,
  StyledParagraphToggleContainer,
} from './styles/carousel';
import { NavigateBackButton, TextButton } from './Button';
import { NavBar } from './NavBar';
const deviceWidth = Dimensions.get('window').width;
const perilContainerSize = 185;

class Carousel extends React.Component {
  navParams = this.props.navigation.state.params;
  items = this.navParams.items;
  renderCta = this.navParams.renderCta;
  state = {
    slideIndex: this.navParams.initialSlideIndex || 0,
    showFullDescription: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch } = this.props;
    return dispatch(NavigationActions.back());
  };

  _renderItem({ item }) {
    return (
      <View>
        <Image
          style={{
            height: perilContainerSize,
            width: perilContainerSize,
          }}
          source={item.itemSrc}
          resizeMode="center"
          key={item.id}
        />
      </View>
    );
  }

  getItem() {
    return this.items[this.state.slideIndex];
  }

  shortDescription() {
    return this.getItem().description;
  }

  shownDescription() {
    return this.state.showFullDescription
      ? this.getItem().longText
      : this.shortDescription();
  }

  maybePolicyLink() {
    if (this.state.showFullDescription && this.getItem().policyUrl) {
      return (
        <View style={{ alignItems: 'center', paddingTop: 0, marginBottom: 40 }}>
          <TextButton
            title="Läsa mer"
            onPress={() =>
              WebBrowser.openBrowserAsync(this.getItem().policyUrl)
            }
          />
        </View>
      );
    }
  }

  maybeCta() {
    if (this.renderCta) {
      return (
        <StyledParagraphToggleContainer>
          {this.renderCta(this.getItem())}
        </StyledParagraphToggleContainer>
      );
    } else {
      return null;
    }
  }

  navbar() {
    return (
      <NavBar
        title={this.navParams.title || 'Carousel'}
        headerLeft={
          <NavigateBackButton onPress={() => this.props.navigation.goBack()} />
        }
      />
    );
  }

  render() {
    let item = this.getItem();
    let title = item.title;
    if (title.includes('-\n')) {
      title = title.replace('-\n', '');
    }
    return (
      <StyledCarouselContainer>
        {this.navbar()}
        <StyledAlignedCarouselItems>
          <StyledImageCarouselContainer>
            <SnapCarousel
              data={this.items}
              renderItem={this._renderItem}
              sliderWidth={deviceWidth}
              sliderHeight={perilContainerSize}
              itemWidth={perilContainerSize}
              firstItem={this.state.slideIndex}
              removeClippedSubviews={false} // removeClippedSubviews fixes an issue where the item is not always initially rendered
              onSnapToItem={slideIndex => {
                this.setState({ slideIndex, showFullDescription: false });
              }}
            />
          </StyledImageCarouselContainer>
          <StyledCarouselTexts>
            <StyledCarouselHeading>{title}</StyledCarouselHeading>
            <StyledCarouselParagraph>
              {this.shownDescription()}
            </StyledCarouselParagraph>
            {this.maybePolicyLink()}
            {this.maybeCta()}
          </StyledCarouselTexts>
        </StyledAlignedCarouselItems>
      </StyledCarouselContainer>
    );
  }
}

const ConnectedCarousel = connect(state => ({ nav: state.nav }))(Carousel);

export { ConnectedCarousel as Carousel };
