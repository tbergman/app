import React from "react"
import {
  View,
  Dimensions
} from "react-native"
import { WebBrowser } from "expo"
import { default as SnapCarousel } from "react-native-snap-carousel"
import {
  StyledCarouselContainer,
  StyledAlignedCarouselItems,
  StyledImageCarouselContainer,
  StyledCarouselImage,
  StyledCarouselHeading,
  StyledCarouselTexts,
  StyledCarouselParagraph,
  StyledParagraphToggleContainer
} from "./styles/carousel"
import { NavigateBackButton, TextButton } from "./Button"
import { NavBar } from "./NavBar"
const deviceWidth = Dimensions.get("window").width
const itemWidth = 186

export class Carousel extends React.Component {
  navParams = this.props.navigation.state.params
  items = this.navParams.items
  renderCta = this.navParams.renderCta
  state = {
    slideIndex: this.navParams.initialSlideIndex || 0,
    showFullDescription: false
  }

  _renderItem({ item }) {
    return (
      <StyledCarouselImage
        source={{ uri: item.imageUrl }}
        width={itemWidth}
        height={itemWidth}
        resizeMode="contain"
      />
    )
  }

  getItem() {
    return this.items[this.state.slideIndex]
  }

  shortDescription() {
    return this.getItem().description
  }

  shownDescription() {
    return this.state.showFullDescription
      ? this.getItem().longText
      : this.shortDescription()
  }

  maybePolicyLink() {
    if (this.state.showFullDescription && this.getItem().policyUrl) {
      return (
        <View style={{ alignItems: "center", paddingTop: 0, marginBottom: 40 }}>
          <TextButton
            title="Läsa mer"
            onPress={() =>
              WebBrowser.openBrowserAsync(this.getItem().policyUrl)}
          />
        </View>
      )
    }
  }

  maybeCta() {
    if (this.renderCta) {
      return (
        <StyledParagraphToggleContainer>
          {this.renderCta(this.getItem())}
        </StyledParagraphToggleContainer>
      )
    } else {
      return null
    }
  }

  navbar() {
    return (
      <NavBar
        title={this.navParams.title || "Carousel"}
        headerLeft={
          <NavigateBackButton onPress={() => this.props.navigation.goBack()} />
        }
      />
    )
  }

  render() {
    let item = this.getItem()
    return (
      <StyledCarouselContainer>
        {this.navbar()}
        <StyledAlignedCarouselItems>
          <StyledImageCarouselContainer>
            <SnapCarousel
              ref={c => {
                this._carousel = c
              }}
              data={this.items}
              renderItem={this._renderItem}
              sliderWidth={deviceWidth}
              itemWidth={itemWidth}
              firstItem={this.state.slideIndex}
              onSnapToItem={slideIndex => {
                this.setState({ slideIndex, showFullDescription: false })
              }}
            />
          </StyledImageCarouselContainer>
          <StyledCarouselTexts>
            <StyledCarouselHeading>{item.title}</StyledCarouselHeading>
            <StyledCarouselParagraph>
              {this.shownDescription()}
            </StyledCarouselParagraph>
            {this.maybePolicyLink()}
            {this.maybeCta()}
          </StyledCarouselTexts>
        </StyledAlignedCarouselItems>
      </StyledCarouselContainer>
    )
  }
}
