// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import env from 'process'


//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js

const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'
const ip = '192.168.68.122'
const localHost = 'http://'+ ip +':5000/journeys'
console.log(localHost)
const Home = (props: any) => {
  const username = props.navigation.state.params.username.username 
  
  const origin = {latitude: 53.5237268, longitude: -6.4142645};
  const destination = {latitude: 53.5395496, longitude: -6.4466271};
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [pin, setPin] = React.useState ({latitude: 53.5237268, longitude: -6.4142645}) // Initial location
  
  const ref = useRef();

  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      //console.log(JSON.stringify(json.exJourneys))
      setData(json.exJourneys);
      console.log(data[0].journeyStart)
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const logValue = () => {
    getData();
    props.navigation.navigate("Maps",  { username: username })
  }

  const RatingPage = () => {
    props.navigation.navigate("Ratings")
  }
  
  const dummyJourney = () => {
    props.navigation.navigate("Dummy",  { username: username })
  }

  const startJourneyPage = () => {
    props.navigation.navigate("StartJourney",  { username: username })
  }

  const journeyInProgress = () => {
    console.log(username);
    props.navigation.navigate("JourneyInProgress", { username: username })
  }
  const endJourney = () => {
    console.log(username);
    props.navigation.navigate("EndJourney", { username: username })
  }
  
  return (
    <View style={styles.container}>
       <Text style={styles.welcomeText}>Welcome back {username}!</Text>
        <TouchableOpacity style={styles.MapsPageBtn}>
          <Text style={styles.homePageBtnText} onPress={logValue}>Maps Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ViewJourneyBtn}>
          <Text style={styles.homePageBtnText} onPress={RatingPage}>Rating Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={dummyJourney}>Dummy Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={startJourneyPage}>Start Journey Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={journeyInProgress}>Journey Progress Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={endJourney}>End Page</Text>
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
    height: 200,
    color: "white",
    fontSize: 25
  },
  homePageBtnText: {
    color: '#000000',
    fontSize: 18,
    height: 30,
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
  ViewJourneyBtn:{
    width: "40%",
    backgroundColor: "#33FF99",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
});

export default Home
