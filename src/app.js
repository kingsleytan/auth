import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDOwLuAamUZNeZ5JyJM5GFV7ttmPTo1trE',
      authDomain: 'auth-be2c4.firebaseapp.com',
      databaseURL: 'https://auth-be2c4.firebaseio.com',
      projectId: 'auth-be2c4',
      storageBucket: 'auth-be2c4.appspot.com',
      messagingSenderId: '612436466595'
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>);

      case false:
        return <LoginForm />;

      default:
        return <CardSection><Spinner size="large" /></CardSection>;
    }
}

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
