import React from 'react';
import {Platform, View, Text, Button, FlatList, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import DetailScreen from './src/HomeScreen/DetailScreen.js';
import HomeScreen from './src/HomeScreen/HomeScreen.js'
import AddFriendScreen from './src/HomeScreen/AddFriendScreen.js';
import SettingsScreen from "./src/SettingsScreen/SettingsScreen.js";
import AddFriendInfoScreen from './src/HomeScreen/AddFriendInfoScreen.js';
import ProfileScreen from "./src/ProfileScreen/ProfileScreen.js";
import EditProfileScreen from "./src/ProfileScreen/EditProfileScreen.js";
import RegScreen from "./src/Registration/RegScreen.js";
import SignInScreen from "./src/Registration/SignInScreen.js";
import SignUpScreen from "./src/Registration/SignUpScreen.js";
import * as firebase from './firebase.js';
import {Segment } from 'expo'

console.disableYellowBox = true;

if (Platform.OS === 'ios'){
    Segment.initializeIOS("KMvbA4VExehbgtYn2J6rBPNoFcqHbJOs")
  } else {
    Segment.initializeAndroid("QeIEXEsYpLHs0l5MXmiiezthFZsDwjQI")
  }

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./assets/icons/white-with-logo.png')}
        style={{ width: 100, height: 27 }}/>
    );
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: <LogoTitle/>,
      headerLeft: <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Profile')}>
          <View>
            <Image source={require('./assets/icons/profile-filled.png')} style={{tintColor: '#f1f1f1', height: 30, width: 30, marginLeft: 15, marginBottom: 5}}/>
          </View>
      </TouchableWithoutFeedback>,
      
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#f1f1f1',
      headerBackTitle: ' '
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  Registration: {
    screen: RegScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerLeft: null,
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  AddFriend: {
    screen: AddFriendScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  AddFriendInfo: {
    screen: AddFriendInfoScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
});

export default RootNavigator;