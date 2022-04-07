// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView  } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'
//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js


const DestinationIn = (props: any) => {
  const origin = props.navigation.state.params.location;
  const journeyType = props.navigation.state.params.journeyType;
  const userName = props.navigation.state.params.username;
  const [pin, setPin] = React.useState (props.navigation.state.params.location)

  const initialRegion =  {
    latitude: Number(props.navigation.state.params.location.latitude), 
    longitude: Number(props.navigation.state.params.location.longitude),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661
  } 
 
  const [sendinfo, destInfo] = React.useState ({})
  var region = initialRegion;

  const routePage = () => {

    props.navigation.navigate("Confirm_Journey", {
      origin_info: props.navigation.state.params.origin,
      origin_location: origin,
      destination_info: sendinfo,
      destination_location: pin ,
      journeyType: journeyType,
      username: userName
    })
  }

  return (    

    <View>
    <ScrollView keyboardShouldPersistTaps="handled">

      <GooglePlacesAutocomplete
        placeholder='Enter your destination'
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        onPress={(data, details = null) => {
          region.latitude = Number(JSON.stringify(details?.geometry?.location.lat))
          region.longitude = Number(JSON.stringify(details?.geometry?.location.lng))
          setPin(region);
          destInfo({data});
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: "country:ie",
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
      />

      <MapView 
      style={styles.map} 
      initialRegion={pin}
      region={pin}
      showsUserLocation>
        <Marker
        coordinate={pin}
        pinColor="green"
        />
        <Marker
        coordinate={origin}
        pinColor="red"
        />
        <MapViewDirections
        lineCap="square"
        lineDashPattern={[1]}
        strokeWidth={5} 
        strokeColor="blue"
        origin={origin}
        destination={pin}
        apikey={GOOGLE_MAPS_APIKEY}
        mode={journeyType}
        />

    </MapView>
    <View style={styles.container}>
    <TouchableOpacity style={styles.ViewJourneyBtn} onPress={routePage}>
          <Text style={styles.homePageBtnText} >Confirm Destination</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
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
  }
});


export default DestinationIn;