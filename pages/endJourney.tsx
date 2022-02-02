// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
  

const EndJourney = (props: any) => {
  
  const goToRating = () => {
    props.navigation.navigate("Ratings")
  }
  
  const goBackToHome = () => {
    props.navigation.navigate("Home")
	
  }
  
  return (
	<View style={styles.container}>
	   <Text style={styles.welcomeText}>Welcome to End Journey Page!</Text>
		<TouchableOpacity style={styles.MapsPageBtn}>
		  <Text onPress={goToRating}>RATE JOURNEY</Text>
		</TouchableOpacity>
		  <TouchableOpacity style={styles.MapsPageBtn}>
		  <Text onPress={goBackToHome}>Back to Homepage</Text>
		</TouchableOpacity>
	  </View> 
  );
}

//styling
const styles = StyleSheet.create({
  MapsPageBtn:{
    width: "50%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  welcomeText:{
    height: 200,
    color: "white",
    fontSize: 25
  },
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
