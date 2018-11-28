import { createStackNavigator } from "react-navigation";
import Login from "./App";
import Home from "./Home";

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
      navigationOptions: () => ({
        title: "Home",
        headerLeft: null
      })
    }
  },
  { initialRouteName: "Login" }
);
