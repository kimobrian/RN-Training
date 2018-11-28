import { createStackNavigator } from "react-navigation";
import React from "react";
import Login from "./App";
import Home from "./Home";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";


const StyledButton = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;

export default createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation: { getParam }}) => ({
        title: `Welcome ${getParam('userInfo').user.givenName}`,
        headerLeft: null,
        headerRight: (
          <StyledButton onPress={this._signOut}>
            <Icon name="power-off" size={24} color="#900" />
          </StyledButton>
        )
      })
    }
  },
  { initialRouteName: "Login" }
);
