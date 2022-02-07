// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
  

const JourneyInProgress = (props: any) => {
  const username = props.navigation.state.params.username.username 
  
  
  const endJourney = () => {
    console.log(input);
    props.navigation.navigate("journeyInProgress", { username: input })
  }
  
  const goBack = () => {
    props.navigation.navigate("Home")
	
  }
  
  return (
	<View style={styles.container}>
	   <Text style={styles.welcomeText}>Welcome to Journey in Progress Page {username}!</Text>
	   <Text style={styles.welcomeText}>This page is displayed when journey is ongoing 🚗!</Text>
		<TouchableOpacity>
		  <Text onPress={endJourney}>END JOURNEY</Text>
		</TouchableOpacity>
		<TouchableOpacity>
		  <Text onPress={goBack}>Back to Homepage</Text>
		</TouchableOpacity>
	  </View> 
  );
}

//styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    height:50,
    color:"white",
    fontSize:25
  },
  map: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height-200),
  },
  searchBox: {
    top: 0,
    position: "absolute",
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
export default JourneyInProgress
