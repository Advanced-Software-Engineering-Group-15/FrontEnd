// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'


//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js


const OriginIn = (props: any) => {

  const journeyType = props.navigation.state.params.journeyType
  const userName = props.navigation.state.params.username
  console.log('origin username', userName)
  const initialRegion =  {
    latitude: Number(53.338165314), 
    longitude: Number(-6.256165642),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661
  }    
  var region = initialRegion;
  
  const [sendinfo, originInfo] = React.useState ({})

  const [pin, setPin] = React.useState ({
    latitude: Number(53.338165314), 
    longitude: Number(-6.256165642),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661
  })

  const destinationPage = () => {
    console.log('sending journey type: ',journeyType)
    props.navigation.navigate("DestinationIn", {
      origin: sendinfo,
      location: pin,
      journeyType: journeyType,
      username: userName
    })
  }

  return (    

    <View>
    <ScrollView keyboardShouldPersistTaps="handled">

      <GooglePlacesAutocomplete
        placeholder='Enter your origin'
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        onPress={(data, details = null) => {
          console.log(details);
          //console.log(data, details)
          //console.log(JSON.stringify(details?.geometry?.location));
          region.latitude = Number(JSON.stringify(details?.geometry?.location.lat))
          region.longitude = Number(JSON.stringify(details?.geometry?.location.lng))
          setPin(region);
          console.log('region is: ', region)
          originInfo({data});
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
    </MapView>
    <View style={styles.container}>
    <TouchableOpacity style={styles.ViewJourneyBtn}>
          <Text style={styles.homePageBtnText} onPress={destinationPage}>Confirm origin</Text>
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

export default OriginIn;


