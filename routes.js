import { createStackNavigator, createDrawerNavigator /*,createBottomTabNavigator*/ } from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import Options from "./screens/Options";

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <Icon name={icon} size={22} style={{ color: tintColor }} />
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
    initialRouteName: "Contacts"
  },
);

ContactsScreens.navigationOptions = {
  drawerLabel: "Contacts",
  drawerIcon: getDrawerItemIcon("list"),
};

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
    initialRouteName: "Favorites"
  },
);

FavoritesScreens.navigationOptions = {
  drawerLabel: "Favorites",
  drawerIcon: getDrawerItemIcon("star"),
};

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
    mode: "modal",
    initialRouteName: "User"
  },
);

UserScreens.navigationOptions = {
  drawerLabel: "Users",
  drawerIcon: getDrawerItemIcon("person"),
};

export default createDrawerNavigator(
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
  // {
  //   initialRouteName: "Contacts",
  //   tabBarOptions: {
  //     style: {
  //       backgroundColor: colors.greyLight,
  //     },
  //     showLabel: false,
  //     activeTintColor: colors.blue,
  //     inactiveTintColor: colors.greyDark,
  //   },
  // },
);
