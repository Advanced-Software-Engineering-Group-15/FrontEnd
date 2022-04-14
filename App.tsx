import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import 'react-native-screens';

import Login from './pages/login.tsx';
import Home from './pages/home.tsx';
import Map from './pages/map.tsx';
import Ratings from './pages/ratings.tsx';
import StartJourney from './pages/startJourney.tsx';
import JourneyInProgress from './pages/journeyInProgress.tsx';
import EndJourney from './pages/endJourney.tsx';
import Journeys from './pages/journeys.tsx';
import CreateNewUserPage from './pages/CreateNewUsers.tsx';
import ConfirmJourney from './pages/confirmJourney.tsx';
import Payment from './pages/payment.tsx';
import MoreOptions from './pages/moreOptions.tsx';
import MyProfile from './pages/myProfile.tsx';
import OriginIn from './pages/input_origin.tsx';
import DestinationIn from './pages/input_destination.tsx';
import JourneyType from './pages/journeyType.tsx';
import FindJourneys from './pages/findJourneys.tsx';
import ViewJourneys from './pages/viewPassengerJourneys.tsx';
import ViewCreatedJourneys from './pages/viewCreatedJourneys.tsx';

const AppNavigator = createStackNavigator(
  {
    Login,
    Home,
    Map,
    OriginIn,
    DestinationIn,
    Ratings,
    StartJourney,
    JourneyInProgress,
    EndJourney,
    Journeys,
    CreateNewUserPage,
    Payment,
    MoreOptions,
    MyProfile,
    ConfirmJourney,
    JourneyType,
    FindJourneys,
    ViewJourneys,
    ViewCreatedJourneys,
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
