import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import HomeScreen from './HomeScreen.js';
import DetailScreen from './DetailScreen.js';
import AddFriendScreen from './AddFriendScreen.js';
import ScheduleScreen from '../ScheduleScreen/ScheduleScreen.js';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name + "'s Profile",
    }),
  },
  AddFriend: {
    screen: AddFriendScreen,
    navigationOptions: ({navigation}) => ({
      title: "Add Connection",
    }),
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name + "'s Schedule",
    }),
  },
});

export default RootNavigator;
