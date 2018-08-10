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
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { MarketingCarousel } from '../../../features/marketing/MarketingCarousel';
import Dialog from '../../../containers/Dialog';
import FloatingActionButton from '../../../features/dashboard/containers/fab';
import Chat from '../../../features/chat/Chat';
import { OfferSwiper } from '../../../features/offer/OfferSwiper';
import { Perils } from '../../Perils';
import Payment from '../../../features/payment';
import Dashboard from '../../../features/dashboard/Dashboard';
import Profile from '../../../containers/Profile';
import { Loader } from '../../../components/Loader';

import { colors } from '../../../style';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  view: {
    flex: 1,
    overflow: 'hidden', // hide drop shadow from header
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: Platform.OS === 'ios' ? 20 : getStatusBarHeight(),
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBarContainer: {
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: colors.BLACK,
    zIndex: 100,
    elevation: 1,
  },
  tabBarButton: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    backgroundColor: colors.WHITE,
  },
  tabBarButtonIsActive: {
    borderBottomColor: colors.PURPLE,
  },
  tabBarButtonText: {
    color: colors.DARK_GRAY,
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
  },
  tabBarButtonTextIsActive: {
    color: colors.OFF_BLACK,
  },
});

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.flex}>
        <StatusBar hidden />
        <Loader />
      </View>
    );
  }
}

class ChatDialogContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.flex}>
        <Chat navigation={navigation} />
        <Dialog />
      </View>
    );
  }
}

const AppContainerWrapper = (Component) => {
  // TODO: needs fixing?
  return ({ navigation }) => {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.view}>
          <Component navigation={navigation} />
        </View>
      </View>
    );
  };
};

const ConversationNavigator = StackNavigator(
  {
    Chat: {
      screen: AppContainerWrapper(ChatDialogContainer),
    },
    Offer: {
      screen: OfferSwiper,
    },
    Perils: {
      screen: AppContainerWrapper(Perils),
    },
    Payment: {
      screen: AppContainerWrapper(Payment),
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

class TabBarButton extends React.Component {
  _navigate = () => {
    this.props.navigation.navigate(this.props.navigateTo);
  };
  render() {
    const { title, isActive } = this.props;
    return (
      <TouchableOpacity
        style={[styles.tabBarButton, isActive && styles.tabBarButtonIsActive]}
        disabled={isActive}
        onPress={this._navigate}
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
  }
}

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
      screen: Dashboard,
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

class AccountContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.view}>
          <AccountNavigator navigation={navigation} />
          <FloatingActionButton />
        </View>
        <Dialog />
      </View>
    );
  }
}

AccountContainer.router = AccountNavigator.router;

const BaseNavigator = StackNavigator(
  {
    Loading: {
      screen: Loading,
    },
    Marketing: {
      screen: MarketingCarousel,
    },
    Conversation: {
      screen: ConversationNavigator,
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
