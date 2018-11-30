/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import config from './config';
import styled from 'styled-components/native';


export default class GoogleSigninSampleApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
      errorCode: null,
      signingIn: false
    };
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      iosClientId: config.iosClientId,
      offlineAccess: false,
    });
  }

  async _getCurrentUser() {
    try {
      this.setState({ signingIn: true });
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ signingIn: false });
      this.setState({ userInfo, error: null });
      const { navigate } = this.props.navigation;
      navigate('Home', { userInfo });
    } catch (error) {
      this.setState({ signingIn: false });
      const errorMessage = error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        // error: new Error(errorMessage),
        errorCode: error.code
      });
    }
  }

  render() {    
    const body = this.renderSignInButton();
    return (
      <View style={[styles.container, { flex: 1 }]}>
        {body}
      </View>
    );
  }

  renderSignInButton() {
    return (
      <StyledView>
        {this.state.signingIn ? <ActivityIndicator size="large" color="#0000ff" /> : (<View>
          <GoogleSigninButton
          style={{ width: 212, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
        />
        {this.renderError()}
        </View>)}
      </StyledView>
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    return <Text>{text}</Text>;
  }

  _signIn = async () => {
    try {
      this.setState({ signingIn: true });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ signingIn: false });
      this.setState({ userInfo, error: null });
      const { navigate } = this.props.navigation;
      navigate('Home', { userInfo });
    } catch (error) {
      this.setState({ signingIn: false });
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };
}


const StyledView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
`

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
