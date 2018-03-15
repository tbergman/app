import React from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
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
  view: {
    flex: 1,
    overflow: "hidden" // hide drop shadow from header
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 20 : Constants.statusBarHeight,
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
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.view}>
        {children}
      </View>
    </View>
  )
}

const ChatContainer = ({navigation}) => {
  return (
    <AppContainer>
      <ChatModalNavigator navigation={navigation}/>
    </AppContainer>
  )
}

ChatContainer.router = ChatModalNavigator.router

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
