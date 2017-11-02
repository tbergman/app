import React from "react"
import { Button, Text, View } from "react-native"
import { TabNavigator } from "react-navigation"
import styled from "styled-components/native"

import { AssetNavigator } from "../asset-tracker/AssetNavigator"
import AssetList from "../../containers/asset-tracker/AssetList"
import Dashboard from "../../containers/dashboard/Dashboard"
import Profile from "../../containers/Profile"

import { Placeholder } from "../Styles"
import { StyledTabBarContainer, StyledTabBarButton, StyledTabBarButtonText } from "../styles/tabbar"

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

const MyTabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const TabBarButton = ({title, disabled, navigation, navigateTo}) => {
  return (
    <StyledTabBarButton
      disabled={disabled}
      onPress={() => {
        navigation.navigate(navigateTo)
      }}
      activeOpacity={0.9}
    >
      <StyledTabBarButtonText disabled={disabled}>
        {title}
      </StyledTabBarButtonText>
    </StyledTabBarButton>
  )
}

class MyTabs extends React.Component {
  render() {
    // console.log("TAB INDEX", this.props.navigation.state.index)
    return (
      <StyledTabBarContainer>
        <MyTabsContainer>
          <TabBarButton
            title="Dashboard"
            disabled={this.props.navigation.state.index === 0}
            navigation={this.props.navigation}
            navigateTo="DashboardTab"
          />
          <TabBarButton
            title="Prylbank"
            disabled={this.props.navigation.state.index === 1}
            navigation={this.props.navigation}
            navigateTo="AssetTrackerTab"
          />
          <TabBarButton
            title="Profil"
            disabled={this.props.navigation.state.index === 2}
            navigation={this.props.navigation}
            navigateTo="ProfileTab"
          />
        </MyTabsContainer>
      </StyledTabBarContainer>
    )
  }
}

const MyTabNavigator = TabNavigator(
  {
    DashboardTab: {
      screen: Dashboard
    },
    AssetTrackerTab: {
      screen: AssetList
    },
    ProfileTab: {
      screen: Profile
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

export { MyTabNavigator }
