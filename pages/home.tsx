// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IP } from '../constants.tsx';

const localHost = `http://${IP}/passengers`;
const journeysURL = `http://${IP}/journeys`;

const Home = (props: any) => {
  const [passengerData, setPassengerData] = useState([]);
  const [data, setData] = useState([]);
  const [creatorData, setCreatorData] = useState([]);
  const username = props.navigation.state.params.userProps.name;
  const userProps = props.navigation.state.params.userProps;
  const signIn = props.navigation.state.params.signIn;
  const isCreator = userProps.isCreator;

  useEffect(() => {
    getData();
    getPassengerData();
    getCreatorData();
  }, [signIn]);
  const getPassengerData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      await new Promise((resolve) => {
        setPassengerData(json.exPassengers);
        return resolve(json.exPassengers);
      }).then((msg) => {
        initialPassengerData(msg);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('ERROR: Did not catch an error, but no journey is caught.');
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(journeysURL);
      const json = await response.json();
      await new Promise((resolve) => {
        setData(json.exJourneys);
        return resolve(json.exJourneys);
      }).then((msg) => {
        initialData(msg);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('ERROR: Did not catch an error, but no journey is caught.');
    }
  };

  const getCreatorData = async () => {
    try {
      const response = await fetch(journeysURL);
      const json = await response.json();
      await new Promise((resolve) => {
        // console.log('json file content: ', json.exPassengers)
        setCreatorData(json.exJourneys);
        return resolve(json.exJourneys);
      }).then((msg) => {
        initialCreatorData(msg);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('ERROR: Did not catch an error, but no journey is caught.');
    }
  };

  const initialPassengerData = async (msg) => {
    const matchingJourneys = [];
    for (let i = 0; i < msg.length; i += 1) {
      if (userProps.userID === msg[i].userID) {
        matchingJourneys.push(msg[i]);
      }
    }
    if (matchingJourneys.length !== 0) {
      setPassengerData(matchingJourneys);
    } else {
      setPassengerData([]);
    }
  };

  const initialData = async (msg) => {
    const matchingJourneys = [];
    for (let i = 0; i < msg.length; i += 1) {
      for (let j = 0; j < passengerData.length; j += 1) {
        if (passengerData[j].journeyID === msg[i].journeyID) {
          matchingJourneys.push(msg[i]);
        }
      }
    }
  };

  const initialCreatorData = async (msg) => {
    const matchingJourneys = [];
    for (let i = 0; i < msg.length; i += 1) {
      if (userProps.userID === msg[i].creatorID) {
        matchingJourneys.push(msg[i]);
      }
    }
    if (matchingJourneys.length !== 0) {
      setCreatorData(matchingJourneys);
    } else {
      setCreatorData([]);
    }
  };
  const journeys = () => {
    props.navigation.navigate('FindJourneys', { userProps });
  };

  const createJourney = () => {
    props.navigation.navigate('JourneyType', { userProps });
  };

  const myProfile = () => {
    props.navigation.navigate('MyProfile', {
      passengerData, data, userProps, creatorData, isCreator,
    });
  };

  return (
    <ScrollView style={styles.scrollBackground}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          {'\n'}
          Welcome back
          {'\n'}
          {username}
          !
        </Text>
        <TouchableOpacity style={styles.ViewJourneyBtn} onPress={journeys}>
          <Text style={styles.homePageBtnText}>Search Journeys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ViewJourneyBtn} onPress={myProfile}>
          <Text style={styles.homePageBtnText}>My Profile</Text>
        </TouchableOpacity>

        { isCreator === 'true' && (
          <TouchableOpacity style={styles.ViewJourneyBtn} onPress={createJourney}>
            <Text style={styles.homePageBtnText}>Create Journey</Text>
          </TouchableOpacity>
        )}

      </View>
    </ScrollView>
  );
};

// styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  scrollBackground: {
    backgroundColor: '#003f5c',
  },
  welcomeText: {
    color: 'white',
    fontSize: 25,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  homePageBtnText: {
    color: '#000000',
    fontSize: 18,
    height: 30,
  },
  MapsPageBtn: {
    width: '40%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  ViewJourneyBtn: {
    width: '45%',
    backgroundColor: '#33FF99',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    // marginLeft: '27%',
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
});

export default Home;
