// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js

//env.GOOGLE_MAPS_APIKEY = "AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8"
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'
const ip = '192.168.68.122'
const localHost = 'http://'+ip+':5000/journeys'
console.log(localHost)
const Maps = (props: any) => {
  
  const origin = {latitude: 53.5237268, longitude: -6.4142645};
  const destination = {latitude: 53.5395496, longitude: -6.4466271};
  
  const [pin, setPin] = React.useState ({latitude: 53.5237268, longitude: -6.4142645}) // Initial location

  
  return (
    <View style={styles.container}>
       {/* <Text style={styles.welcomeText}>Welcome back {username}!</Text> */}
        {/* <TouchableOpacity>
          <Text onPress={logValue}>Get Data</Text>
        </TouchableOpacity> */}

      {/* <GooglePlacesAutocomplete
      style={styles.textInput}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
    /> */}
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            //autoFocus={false}
            //returnKeyType={'search'}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }} 
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            renderDescription={(row) => row.description} // custom description render

            styles={searchInputStyle}

        />

      </View>
      
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

const searchInputStyle={
  container: {
      backgroundColor: '#fff',
      width: Dimensions.get('window').width,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      marginBottom: 0,
      opacity: 0.9,
      borderRadius: 8
  },
  description: {
      fontWeight: 'bold',
      color: "#007",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      opacity: 0.9,
  },
  predefinedPlacesDescription: {
      color: '#355',
  },
  textInputContainer: {
      height: 50,

  },
      textInput: {
      height: 33,
      fontSize: 16
  }
}

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

export default Maps