import React from "react"
import { View, ScrollView, Button, Text, Image, TouchableOpacity, Dimensions } from "react-native"
import Placeholder from "rn-placeholder"
import { default as SnapCarousel } from "react-native-snap-carousel"
import styled from "styled-components/native"

const deviceWidth = Dimensions.get("window").width


const StyledPeril = styled.View`
  width: 90
  align-items: center
`


export class Carousel extends React.Component {

  navParams = this.props.navigation.state.params
  items = this.navParams.items
  renderCta = this.navParams.renderCta
  state = {
    slideIndex: this.navParams.initialSlideIndex || 0
  }


  _renderItem({ item, index }) {
    return (
      <Image
        source={{ uri: item.imageUrl }}
        style={{
          backgroundColor: "blue",
          height: 200,
          width: deviceWidth - 100
          // marginLeft: 20,
          // marginRight: 20
        }}
      />
    )
  }

  render() {
    let item = this.items[this.state.slideIndex]
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <View style={{ height: 200 }}>
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
              this.setState({ slideIndex })
            }}
          />
        </View>
        <Text>Title: {item.title}</Text>
        <Text>Description: {item.description}</Text>
        {this.renderCta && this.renderCta(item)}
      </View>
    )
  }
}
