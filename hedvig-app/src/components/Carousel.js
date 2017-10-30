import React from "react"
import {
  View,
  ScrollView,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native"
import Placeholder from "rn-placeholder"
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
import { RoundedButton, NavigateBackButton } from "./Button"
import { NavBar } from "./NavBar"
const deviceWidth = Dimensions.get("window").width

export class Carousel extends React.Component {
  navParams = this.props.navigation.state.params
  items = this.navParams.items
  renderCta = this.navParams.renderCta
  state = {
    slideIndex: this.navParams.initialSlideIndex || 0,
    showFullDescription: false
  }

  _renderItem({ item, index }) {
    return (
      <StyledCarouselImage
        source={{ uri: item.imageUrl }}
        width={deviceWidth - 100}
      />
    )
  }

  getItem() {
    return this.items[this.state.slideIndex]
  }

  shortDescription() {
    return this.getItem().description.substr(0, 300)
  }

  shownDescription() {
    return this.state.showFullDescription
      ? this.getItem().description
      : this.shortDescription()
  }

  maybeToggleButton() {
    let showParagraphToggle =
      this.getItem().description.length !== this.shortDescription().length
    if (showParagraphToggle) {
      return (
        <StyledParagraphToggleContainer>
          <RoundedButton
            title={
              this.state.showFullDescription ? "Visa mindre" : "Mer information"
            }
            onPress={() =>
              this.setState({
                showFullDescription: !this.state.showFullDescription
              })}
          />
        </StyledParagraphToggleContainer>
      )
    }
  }

  navbar() {
    return (
      <NavBar
        title={this.navParams.title || "Carouselqu"}
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
              itemWidth={deviceWidth - 100}
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
            {this.maybeToggleButton()}
          </StyledCarouselTexts>
          {this.renderCta && this.renderCta(item)}
        </StyledAlignedCarouselItems>
      </StyledCarouselContainer>
    )
  }
}
