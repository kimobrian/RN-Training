import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './App';

export default createStackNavigator({
  Auth: {
    screen: Login
  },
});