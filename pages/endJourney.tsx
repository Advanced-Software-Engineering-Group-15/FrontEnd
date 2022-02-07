// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
  

const EndJourney = (props: any) => {

  const username = props.navigation.state.params.username.username 
  
  const startJourney = () => {
    console.log(input);
    props.navigation.navigate("journeyInProgress", { username: input })
  }
  const goToRating = () => {
    console.log(input);
    props.navigation.navigate("ratings", { username: input })
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
  MapsPageBtn:{
    width: "40%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
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

export default EndJourney
