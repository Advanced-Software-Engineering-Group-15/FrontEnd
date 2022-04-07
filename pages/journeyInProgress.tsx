// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

function JourneyInProgress(props: any) {
  const { userProps } = props.navigation.state.params;

  const endJourney = () => {
    props.navigation.navigate('EndJourney', { userProps });
  };

  const goBack = () => {
    props.navigation.navigate('Home', { userProps });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        {'Welcome '}
        {userProps.username}
        !
      </Text>
      <Text style={styles.welcomeText}>Your Journey is in progress! 🚗</Text>
      <TouchableOpacity style={styles.MapsPageBtn}>
        <Text onPress={endJourney}>END JOURNEY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.MapsPageBtn}>
        <Text onPress={goBack}>Back to Homepage</Text>
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
    height: 50,
    color: 'white',
    fontSize: 25,
  },
  searchBox: {
    top: 0,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
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
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});
export default JourneyInProgress;
