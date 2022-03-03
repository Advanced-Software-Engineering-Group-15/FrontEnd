import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { createMemoryHistory } from 'history';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler";
import "react-native-screens";

import Login from './pages/login';
import Home from './pages/home';
import Maps from './pages/maps';
import Ratings from './pages/ratings';
import StartJourney from './pages/startJourney';
import JourneyInProgress from './pages/journeyInProgress';
import EndJourney from './pages/endJourney';
import Journeys from './pages/journeys';
import CreateNewUserPage from './pages/CreateNewUsers';
import Create_Journey from './pages/create_journey';
import Payment from './pages/payment';
import MoreOptions from './pages/MoreOptions';
import MyProfile from './pages/myProfile';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Home: Home,
    Maps: Maps,
    Ratings: Ratings,
    StartJourney: StartJourney,
    JourneyInProgress: JourneyInProgress,
    EndJourney: EndJourney,
    Journeys: Journeys,
    CreateNewUserPage: CreateNewUserPage,
    Create_Journey: Create_Journey,
    Payment: Payment,
    MoreOptions: MoreOptions,
    MyProfile: MyProfile,
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