// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
  

const EndJourney = (props: any) => {
  const username = props.navigation.state.params.username.username 
  
  const startJourney = () => {
    console.log(input);
    props.navigation.navigate("journeyInProgress", { username: input })
  }
  
  const goBackToHome = () => {
    props.navigation.navigate("Home")
	
  }
  
  return (
	<View style={styles.container}>
	   <Text style={styles.welcomeText}>Welcome to End Journey Page {username}!</Text>
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
  startText:{
    height:50,
    color:"white",
    fontSize:25
  },
  startBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});

export default EndJourney