import React from "react"
import {
  View,
  StyleSheet,
  StatusBar
} from "react-native"
import { StackNavigator } from "react-navigation"
import { Constants } from "expo"

import { ChatModalNavigator, HomeBase } from "../base"
import { ConnectedMarketingCarousel } from "../../MarketingCarousel"

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "white"
  },
  appContainer: {
    flex: 1,
  },
  tabBar: {
    height: Constants.statusBarHeight || 20,
    backgroundColor: "white",
    zIndex: 1,
  },
});

const Loading = () => {
  return (
    <View style={styles.loading}>
      <StatusBar hidden />
    </View>
  )
}

const AppContainer = ({children}) => {
  return (
    <View style={styles.appContainer}>
      <View style={styles.tabBar} />
      {children}
    </View>
  )
}

const ChatContainer = () => {
  return (
    <AppContainer>
      <ChatModalNavigator />
    </AppContainer>
  )
}

const HomeContainer = () => {
  return (
    <AppContainer>
      <HomeBase />
    </AppContainer>
  )
}

const BaseNavigator = StackNavigator(
  {
    Loading: {
      screen: Loading,
    },
    Marketing: {
      screen: ConnectedMarketingCarousel,
    },
    ChatBase: {
      screen: ChatContainer,
    },
    HomeBase: {
      screen: HomeContainer,
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Loading",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

export default BaseNavigator
