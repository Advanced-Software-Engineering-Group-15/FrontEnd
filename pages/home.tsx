// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

function Home(props: any) {
  const username  = props.navigation.state.params.userProps.name;
  const userProps  = props.navigation.state.params.userProps;
  console.log('username is: ', username)
  console.log('userProps is: ', userProps)

  const RatingPage = () => {
    props.navigation.navigate('Ratings');
  };

  const payment = () => {
    props.navigation.navigate('Payment', { username });
  };

  const journeys= () => {
    props.navigation.navigate("FindJourneys", { userProps })
  }
  
  
  const Create_Journey = () => {
    props.navigation.navigate("JourneyType", { username: username })
  }

  const createJourney = () => {
    props.navigation.navigate('JourneyType', { userProps });
  };

  const moreOptions = () => {
    props.navigation.navigate('MoreOptions', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome back
        {username}
        !
      </Text>
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={RatingPage}>Rating Page</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={journeys}>JourneysPage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={payment}>Payment Page</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={createJourney}>Create Journey</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={moreOptions}>More Options</Text>
      </TouchableOpacity>
    </View>
  );
}

// styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    height: 200,
    color: 'white',
    fontSize: 25,
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
    width: '40%',
    backgroundColor: '#33FF99',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
});

export default Home;
