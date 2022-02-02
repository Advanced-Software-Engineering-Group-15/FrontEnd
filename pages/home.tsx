// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import env from 'process'


//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js

//env.GOOGLE_MAPS_APIKEY = "AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8"
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'
const ip = '192.168.68.122'
const localHost = 'http://'+ip+':5000/journeys'
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
  
  const DummyJourney = () => {
    props.navigation.navigate("Dummy",  { username: username })
  }

  const startJourneyPage = () => {
    props.navigation.navigate("startJourney",  { username: username })
  }
  
  return (
    <View style={styles.container}>
       <Text style={styles.welcomeText}>Welcome back {username}!</Text>
        <TouchableOpacity>
          <Text onPress={logValue}>Maps Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={RatingPage}>Rating Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={DummyJourney}>Dummy Page</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={startJourneyPage}>Start Journey Page</Text>
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

export default Home