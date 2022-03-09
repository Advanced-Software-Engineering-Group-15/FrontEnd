// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { IP } from '../constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DestinationCard from "../components/DestinationCard";
import GooglePlacesInput from '../components/googleAutocompleteCard'
import GoogleMapView from '../components/googleMapView';
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'
//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js


const localHost = 'http://'+IP+'/journeys'
console.log(localHost)
const Maps = (props: any) => {
  
  const originData = props.navigation.state.params.start;
  const destData = props.navigation.state.params.end;
  
  const origin = {latitude: Number(originData.latitude), longitude: Number(originData.longitude)};
  const destination = {latitude: Number(destData.latitude), longitude: Number(destData.longitude)};
  
  const initialRegion =  {
    latitude: Number(originData.latitude), 
    longitude: Number(originData.longitude),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661
  }         

  console.log("ORIGIN: ",origin)
  console.log("DESTINATION: ",destination)
  const [pin, setPin] = React.useState (origin) // Initial location

  
  return ( 
    
    <GooglePlacesInput />

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