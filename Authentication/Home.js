import React from 'react';
import { Text, Button, View } from 'react-native';
import styled from 'styled-components/native';
import { GoogleSignin } from 'react-native-google-signin';


const StyledView = styled.View`
  flex: 1; 
  align-items: center; 
  justify-content: center;
`


const StyledViewB = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
`

const StyledText = styled.Text`
  color: palevioletred;
`

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  async componentDidMount() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(!isSignedIn) navigate('Login');
    else {
      const { navigation } = this.props;
      const userInfo = navigation.getParam('userInfo');
      this.setState({ userInfo, error: null})
    }
  }


  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    return <Text>{text}</Text>;
  }

  _signOut = async () => {
    const { navigate } = this.props.navigation;
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null, error: null });
      navigate('Login');
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  renderUserInfo(userInfo) {
    return (
      <StyledViewB>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
          Welcome {userInfo.user.name}
        </Text>
        <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>

        <Button onPress={this._signOut} title="Log out" />
        {this.renderError()}
      </StyledViewB>
    );
  }

  render() {
    const { navigation } = this.props;
    const userInfo = navigation.getParam('userInfo');
    return (
      <StyledView>
        <Text>Home Screen</Text>
        {this.renderUserInfo(userInfo)}
      </StyledView>
    );
  }
}