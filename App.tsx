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
import Maps from './pages/maps';
import Map from './pages/map';
import Ratings from './pages/ratings';
import StartJourney from './pages/startJourney';
import JourneyInProgress from './pages/journeyInProgress';
import EndJourney from './pages/endJourney';
import Journeys from './pages/journeys';
import CreateNewUserPage from './pages/CreateNewUsers';
import Confirm_Journey from './pages/confirmJourney';
import Payment from './pages/payment';
import MoreOptions from './pages/moreOptions';
import MyProfile from './pages/myProfile';
import OriginIn from './pages/input_origin'
import DestinationIn from './pages/input_destination'
import JourneyType from './pages/journeyType'
import FindJourneys from './pages/findJourneys'

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Home: Home,
    Maps: Maps,
    Map: Map,
    OriginIn: OriginIn,
    DestinationIn: DestinationIn,
    Ratings: Ratings,
    StartJourney: StartJourney,
    JourneyInProgress: JourneyInProgress,
    EndJourney: EndJourney,
    Journeys: Journeys,
    CreateNewUserPage: CreateNewUserPage,
    Payment: Payment,
    MoreOptions: MoreOptions,
    MyProfile: MyProfile,
    Confirm_Journey:  Confirm_Journey,
    JourneyType: JourneyType,
    FindJourneys: FindJourneys
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