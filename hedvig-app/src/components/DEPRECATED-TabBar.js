/*
NOTE This file is DEPRECATED!
See src/components/navigation/*
and src/containers/navigation/navigation.js
to find the functionality that used to be in this file.

See storybook/stories/index.js to see how the files above are used
*/

import React from "react"
import {
  Text,
  Button,
  Dimensions,
  Image,
  View,
  TouchableHighlight
} from "react-native"
import Carousel from "react-native-snap-carousel"
import {
  TabNavigator,
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from "react-navigation"
import { connect } from "react-redux"
import styled from "styled-components/native"
import { Placeholder } from "./Styles"
import Chat from "./Chat"

const deviceWidth = Dimensions.get("window").width

class DashboardTab extends React.Component {
  render() {
    return (
      <Placeholder>
        <Text>Dashboard</Text>
        <Button
          title="Launch modal on 2"
          onPress={() =>
            this.props.navigation.navigate("MyModal", {
              initialRouteName: "B"
            })}
        />
      </Placeholder>
    )
  }
}

class AssetTrackerTab extends React.Component {
  render() {
    return (
      <Placeholder>
        <Text>Asset Tracker</Text>
        <Button
          title="Launch modal on 3"
          onPress={() =>
            this.props.navigation.navigate("MyModal", {
              initialRouteName: "C"
            })}
        />
      </Placeholder>
    )
  }
}

const images = [
  "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
  "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg"
]

class ModalCarousel extends React.Component {
  state = {
    content: "-"
  }

  _renderItem({ item, index }) {
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

const MyTabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

class MyTabs extends React.Component {
  render() {
    // console.log("TAB INDEX", this.props.navigation.state.index)
    return (
      <MyTabsContainer>
        <Button
          title="Dashboard"
          disabled={this.props.navigation.state.index === 0}
          onPress={() => {
            this.props.navigation.navigate("DashboardTab")
          }}
        />
        <Button
          title="Asset Tracker"
          disabled={this.props.navigation.state.index === 1}
          onPress={() => {
            this.props.navigation.navigate("AssetTrackerTab")
          }}
        />
      </MyTabsContainer>
    )
  }
}

const MyTabNavigator = TabNavigator(
  {
    DashboardTab: {
      screen: DashboardTab
    },
    AssetTrackerTab: {
      screen: AssetTrackerTab
    }
  },
  {
    tabBarComponent: MyTabs,
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: "DashboardTab"
  }
)

const HomeBaseNavigator = StackNavigator(
  {
    MyTabNavigator: {
      screen: MyTabNavigator
    },
    MyModal: {
      screen: MyModalNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)

const FloatingChatButtonComponent = ({
  dispatch,
  bottom = 20,
  right = 20,
  zIndex = 100
}) => {
  return (
    <TouchableHighlight
      style={{
        position: "absolute",
        bottom,
        right,
        zIndex
      }}
      onPress={() =>
        dispatch({
          type: "Navigation/NAVIGATE",
          routeName: "ChatBase",
          action: {
            type: "Navigation/NAVIGATE",
            routeName: "ChatBase"
          }
        })}
    >
      <Text>Chat</Text>
    </TouchableHighlight>
  )
}

const FloatingChatButton = connect()(FloatingChatButtonComponent)

const FloatingHomeButtonComponent = ({
  dispatch,
  bottom = 20,
  right = 20,
  zIndex = 100
}) => {
  return (
    <TouchableHighlight
      style={{
        position: "absolute",
        bottom,
        right,
        zIndex
      }}
      onPress={() =>
        dispatch({
          type: "Navigation/NAVIGATE",
          routeName: "HomeBase",
          action: {
            type: "Navigation/NAVIGATE",
            routeName: "HomeBase"
          }
        })}
    >
      <Text>Dashboard</Text>
    </TouchableHighlight>
  )
}

const FloatingHomeButton = connect()(FloatingHomeButtonComponent)

const HomeBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* <FloatingChatButton navigation={navigation} /> */}
      <HomeBaseNavigator />
    </View>
  )
}

const ChatBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FloatingHomeButton navigation={navigation} />
      <Chat />
    </View>
  )
}

const BaseNavigator = TabNavigator(
  {
    ChatBase: {
      screen: ChatBase
    },
    HomeBase: {
      screen: HomeBase
    }
  },
  {
    tabBarComponent: () => <View />,
    // tabBarPosition: "top",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: "HomeBase"
  }
)

const ReduxBaseNavigator = ({ dispatch, nav }) => {
  return (
    <BaseNavigator
      navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav
      })}
    />
  )
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

const ConnectedReduxBaseNavigator = connect(mapStateToProps)(ReduxBaseNavigator)

export { ConnectedReduxBaseNavigator, BaseNavigator }
