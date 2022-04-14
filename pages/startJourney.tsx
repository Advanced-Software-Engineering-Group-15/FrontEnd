import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

const StartJourney = (props: any) => {
  const username = props.navigation.state.params.username.username;

  const journeyInProgress = () => {
    props.navigation.navigate('JourneyInProgress');
  };

  const goBack = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Start Journey Page
        {username}
        !
      </Text>
      <TouchableOpacity style={styles.MapsPageBtn}>
        <Text onPress={journeyInProgress}>Lets start the journey</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.MapsPageBtn}>
        <Text onPress={goBack}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

// styling
const styles = StyleSheet.create({
  MapsPageBtn: {
    width: '50%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  welcomeText: {
    height: 200,
    color: 'white',
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    height: 50,
    color: 'white',
    fontSize: 25,
  },
  startBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});

export default StartJourney;
