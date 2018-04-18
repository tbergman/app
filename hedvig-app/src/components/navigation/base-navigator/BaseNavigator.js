import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

import { ConnectedMarketingCarousel } from '../../MarketingCarousel';
import Dialog from '../../../containers/Dialog';
import { FloatingChatButton } from '../floatingButtons';
import Chat from '../../../containers/Chat';
import Offer from '../../../containers/dashboard/Offer';
import { Perils } from '../../Perils';
import Payment from '../../../features/payment';
import Dashboard from '../../../containers/dashboard/Dashboard';
import Profile from '../../../containers/Profile';
import { Loader } from '../../../components/Loader';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    flex: 1,
  },
  view: {
    flex: 1,
    overflow: 'hidden', // hide drop shadow from header
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBarContainer: {
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: '#000',
    zIndex: 100,
    elevation: 1,
  },
  tabBarButton: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    backgroundColor: '#fff',
  },
  tabBarButtonIsActive: {
    borderBottomColor: '#651EFF',
  },
  tabBarButtonText: {
    color: '#9B9BAA',
    fontFamily: 'circular',
    fontSize: 16,
  },
  tabBarButtonTextIsActive: {
    color: '#414150',
  },
});

const Loading = () => {
  return (
    <View style={styles.loading}>
      <StatusBar hidden />
      <Loader />
    </View>
  );
};

const ChatDialogContainer = ({ navigation }) => {
  return (
    <View style={styles.flex}>
      <Chat navigation={navigation} />
      <Dialog />
    </View>
  );
};

const ConversationNavigator = StackNavigator(
  {
    Chat: {
      screen: ChatDialogContainer,
    },
    Offer: {
      screen: Offer,
    },
    Perils: {
      screen: Perils,
    },
    Payment: {
      screen: Payment,
    },
  },
  {
    initialRouteName: 'Chat',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const AppContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.view}>{children}</View>
    </View>
  );
};

const ConversationContainer = ({ navigation }) => {
  return (
    <AppContainer>
      <ConversationNavigator navigation={navigation} />
    </AppContainer>
  );
};

ConversationContainer.router = ConversationNavigator.router;

const TabBarButton = ({ title, isActive, navigation, navigateTo }) => {
  return (
    <TouchableOpacity
      style={[styles.tabBarButton, isActive && styles.tabBarButtonIsActive]}
      disabled={isActive}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
      activeOpacity={0.9}
    >
      <Text
        style={[
          styles.tabBarButtonText,
          isActive && styles.tabBarButtonTextIsActive,
        ]}
        disabled={isActive}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

class AccountTabBar extends React.Component {
  render() {
    return (
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          <TabBarButton
            title="Försäkring"
            isActive={this.props.navigation.state.index === 0}
            navigation={this.props.navigation}
            navigateTo="Dashboard"
          />
          <TabBarButton
            title="Profil"
            isActive={this.props.navigation.state.index === 1}
            navigation={this.props.navigation}
            navigateTo="Profile"
          />
        </View>
      </View>
    );
  }
}

const AccountTabNavigator = TabNavigator(
  {
    Dashboard: {
      screen: ({ navigation }) => (
        <Dashboard navigation={navigation} extraScrollViewPadding={80} />
      ),
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    tabBarComponent: AccountTabBar,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Dashboard',
  },
);

const AccountNavigator = StackNavigator(
  {
    AccountTabs: {
      screen: AccountTabNavigator,
    },
    Perils: {
      screen: Perils,
    },
    Payment: {
      screen: Payment,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

/*
NOTE: The order of the floating buttons vs the other components in the
Chat and Account below affects whether the floating buttons are visible
on Android!
*/
const AccountContainer = ({ navigation }) => {
  return (
    <AppContainer>
      <AccountNavigator navigation={navigation} />
      <FloatingChatButton />
      <Dialog />
    </AppContainer>
  );
};

AccountContainer.router = AccountNavigator.router;

const BaseNavigator = StackNavigator(
  {
    Loading: {
      screen: Loading,
    },
    Marketing: {
      screen: ConnectedMarketingCarousel,
    },
    Conversation: {
      screen: ConversationContainer,
    },
    Account: {
      screen: AccountContainer,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Loading',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default BaseNavigator;
