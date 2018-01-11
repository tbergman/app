import React from "react"
import { Button, Text, Dimensions, Image, View } from "react-native"
import { StackNavigator } from "react-navigation"
import Carousel from "react-native-snap-carousel"

import { FloatingChatButton } from "./floatingButtons"

const deviceWidth = Dimensions.get("window").width

const images = [
  "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
  "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg"
]

class ModalCarousel extends React.Component {
  state = {
    content: "-"
  }

  _renderItem({ item }) {
    return (
      <Image
        source={{ uri: item }}
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
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <View style={{ height: 200 }}>
          <Carousel
            ref={c => {
              this._carousel = c
            }}
            data={images}
            renderItem={this._renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth - 100}
            onSnapToItem={slideIndex => {
              this.setState({ content: slideIndex })
            }}
          />
        </View>
        <Text>
          {this.state.content}
        </Text>
      </View>
    )
  }
}

const MyModalNavigator = StackNavigator({
  ModalRoot: {
    screen: ({ navigation }) => {
      return (
        <View style={{ flex: 1 }}>
          <FloatingChatButton navigation={navigation} />
          <ModalCarousel />
          <Button
            title="Modal root"
            onPress={() => navigation.navigate("ModalNext")}
          />
        </View>
      )
    }
  },
  ModalNext: {
    screen: () => {
      return <Text>Modal next</Text>
    }
  }
})

class MyModal extends React.Component {
  render() {
    return <MyModalNavigator />
  }
}

export { MyModal, MyModalNavigator }
