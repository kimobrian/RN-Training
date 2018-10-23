import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ContactThumbnail from "../components/ContactThumbnail";

import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";
import store from "../store";

export default class User extends React.Component {
  static navigationOptions = ({ navigation: { toggleDrawer, navigate }}) => ({
    title: "Me",
    headerTintColor: "white",
    headerStyle: { backgroundColor: colors.blue },
    headerLeft: (
      <Icon
        name="menu"
        size={24}
        style={{ color: "white", marginLeft: 10 }}
        onPress={() => toggleDrawer()}
      />
    ),
    headerRight: (
      <Icon
        name="settings"
        size={24}
        style={{ color: "white", marginRight: 10 }}
        onPress={() => navigate("Options")}
      />
    )
  });

  // state = {
  //   user: [],
  //   loading: true,
  //   error: false,
  // };

  state = {
    user: store.getState().user,
    loading: store.getState().isFetchingUser,
    error: store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error
      }));

    const user = await fetchUserContact();

    store.setState({ user, isFetchingUser: false });

    // try {
    //   const user = await fetchUserContact();

    //   this.setState({
    //     user,
    //     loading: false,
    //     error: false,
    //   });
    // } catch (e) {
    //   this.setState({
    //     loading: false,
    //     error: true,
    //   });
    // }
  }
  
  componentWillUnmount() {
    this.unsubscribe();
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
    backgroundColor: colors.blue
  }
});
