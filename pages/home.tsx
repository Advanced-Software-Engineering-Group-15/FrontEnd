// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
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
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {username}!</Text>
        <TouchableOpacity>
          <Text onPress={logValue}>Get Data</Text>
        </TouchableOpacity>

      <MapView 
        style={styles.map} 
        initialRegion={{ 
          latitude: 53.5237268, 
          longitude: -6.4142645,
          latitudeDelta: 0.000281,
          longitudeDelta: 0.002661
        }}
        showsUserLocation
      >
        <Marker 
          coordinate={pin}
          pinColor="red"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag starts", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        >

          <Callout>
            <Text>Current location</Text>
          </Callout>

        </Marker>

        <MapViewDirections
          lineCap="square"
          lineDashPattern={[1]}
          strokeWidth={5} 
          strokeColor="blue"
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />

      </MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Home