import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import 'react-native-screens';

import Login from './pages/login.tsx';
import Home from './pages/home.tsx';
import Maps from './pages/maps.tsx';
import Map from './pages/map.tsx';
import Ratings from './pages/ratings.tsx';
import StartJourney from './pages/startJourney.tsx';
import JourneyInProgress from './pages/journeyInProgress.tsx';
import EndJourney from './pages/endJourney.tsx';
import Journeys from './pages/journeys.tsx';
import CreateNewUserPage from './pages/CreateNewUsers.tsx';
import Create_Journey from './pages/create_journey.tsx';
import Confirm_Journey from './pages/confirmJourney.tsx';
import Payment from './pages/payment.tsx';
import MoreOptions from './pages/moreOptions.tsx';
import MyProfile from './pages/myProfile.tsx';
import OriginIn from './pages/input_origin.tsx';
import DestinationIn from './pages/input_destination.tsx';
import JourneyType from './pages/journeyType.tsx';
import FindJourneys from './pages/findJourneys.tsx';

const AppNavigator = createStackNavigator(
  {
    Login,
    Home,
    Maps,
    Map,
    OriginIn,
    DestinationIn,
    Ratings,
    StartJourney,
    JourneyInProgress,
    EndJourney,
    Journeys,
    CreateNewUserPage,
    Create_Journey,
    Payment,
    MoreOptions,
    MyProfile,
    Confirm_Journey,
    JourneyType,
    FindJourneys,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#006600',
      },
      headerTintColor: '#FFF',
    },
  },
);

const Navigator = createAppContainer(AppNavigator);

// what is returned on screen
export default function App() {
  return (
    <Navigator>
      <Login />
    </Navigator>
  );
}
