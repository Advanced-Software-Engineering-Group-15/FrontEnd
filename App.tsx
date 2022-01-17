import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { createMemoryHistory } from 'history';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler"
import "react-native-screens"

import Login from './pages/login';
import Home from './pages/home';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Home: Home,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#006600",
      },
      headerTintColor: "#FFF",
    },
  }
);
  
const Navigator = createAppContainer(AppNavigator);

//what is returned on screen
export default function App() {

  return (
    <Navigator>
      <Login />
    </Navigator>
  );
};

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});