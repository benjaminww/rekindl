import React from 'react';
import { View, Text, Image } from 'react-native';
import { TabNavigator } from 'react-navigation'; 
import HomeNavigator from "./src/HomeScreen/HomeNavigator.js";
import MemoriesScreen from "./src/MemoriesScreen/MemoriesScreen.js";
import ProfileScreen from "./src/ProfileScreen/ProfileScreen.js";
import SettingsScreen from "./src/SettingsScreen/SettingsScreen.js";


const RootTabs = TabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => {
        return <Image
          source={require('./assets/icons/home-white.png')}
          style={[{width: 26, height: 26}, {tintColor: tintColor}]}
        />
      },
    },
  },
  Memories: {
    screen: MemoriesScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
});

export default RootTabs;