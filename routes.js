import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native'

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';

import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
  <Icon name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreens = createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Contacts'
  },
);

ContactsScreens.navigationOptions = {
  tabBarIcon: getTabBarIcon('list'),
}

const FavoritesScreens = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Favorites'
  },
);

FavoritesScreens.navigationOptions = {
  tabBarIcon: getTabBarIcon('star'),
}

const UserScreens = createStackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options
    }
  },
  {
    mode: 'modal',
    initialRouteName: 'User'
  },
);

UserScreens.navigationOptions = {
  tabBarIcon: getTabBarIcon('person'),
}

export default createBottomTabNavigator(
  {
    Contacts: {
      screen: ContactsScreens,
    },
    Favorites: {
      screen: FavoritesScreens,
    },
    User: {
      screen: UserScreens,
    },
  },
  {
    initialRouteName: 'Contacts',
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: false,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
    },
  },
);
