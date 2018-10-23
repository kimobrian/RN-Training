import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DrawerActions } from "react-navigation-drawer";

import ContactThumbnail from "../components/ContactThumbnail";

import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";

export default class User extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Me",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerLeft: (
      <Icon
        name="menu"
        size={24}
        style={{ color: "white", marginLeft: 10 }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
    headerRight: (
      <Icon
        name="settings"
        size={24}
        style={{ color: "white", marginRight: 10 }}
        onPress={() => navigation.navigate("Options")}
      />
    ),
  });

  state = {
    user: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const user = await fetchUserContact();

      this.setState({
        user,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { loading, user, error } = this.state;
    const { avatar, name, phone } = user;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading && (
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
});
