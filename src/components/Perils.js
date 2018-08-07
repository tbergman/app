import React from 'react';
import {
  View,
  Dimensions,
  BackHandler,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
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

const styles = StyleSheet.create({
  perilImage: { width: perilContainerSize, height: perilContainerSize },
  policyLinkContainer: {
    alignItems: 'center',
    paddingTop: 0,
    marginBottom: 40,
  },
});

class Perils extends React.Component {
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
          style={styles.perilImage}
          source={item.itemSrc}
          resizeMode="contain"
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
        <View style={styles.policyLinkContainer}>
          <TextButton
            title="Läsa mer"
            onPress={() => Linking.openUrl(this.getItem().policyUrl)}
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

  _onSnapToItem = (slideIndex) => {
    this.setState({ slideIndex, showFullDescription: false });
  };

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
              inactiveSlideOpacity={0.4}
              inactiveSlideScale={0.7}
              removeClippedSubviews={false} // removeClippedSubviews fixes an issue where the item is not always initially rendered
              onSnapToItem={this._onSnapToItem}
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

const ConnectedPerils = connect((state) => ({ nav: state.nav }))(Perils);

export { ConnectedPerils as Perils };
