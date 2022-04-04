import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Dimensions, View, TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'
import { IP } from '../constants';
//These will be useful resources for adding waypoints etc+
//https://stackoverflow.com/questions/64002670/how-to-update-google-maps-react-direction-route
//https://stackblitz.com/edit/adding-direction-waypoint-1xyogt?file=src/MapComponent.js

const localHost = 'http://'+ IP +'/newPassenger'

const Map = (props: any) => {
  
  const originData = props.navigation.state.params.start;
  const destData = props.navigation.state.params.end;
  const journeyID = props.navigation.state.params.journeyID;
  const creatorID = props.navigation.state.params.creatorID;
  const [userID, setUserID] = useState(1)
  
  const origin = {latitude: Number(originData.latitude), longitude: Number(originData.longitude)};
  const destination = {latitude: Number(destData.latitude), longitude: Number(destData.longitude)};
  
  const initialRegion =  {
    latitude: Number(originData.latitude), 
    longitude: Number(originData.longitude),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661
  }       
  const routePage = () => {

    props.navigation.navigate("Home", {
    })
  }  

  const addToJourney = () => {
    console.log("HERE\n\n\n\n")
    console.log(journeyID, creatorID, userID);
   
    var data = {
      "journeyID": journeyID,
      "creatorID": creatorID,
      "userID": userID
    }

    axios.post(localHost, {
      body: JSON.stringify(data)
    })
    .then(function (response) {
      console.log(response);
      props.navigation.navigate("Home", { status: 'True'})
    })
    .catch(function (error) {
      console.log(error);
      props.navigation.navigate("Home", { status: 'False' })
    });
  };

  console.log("ORIGIN: ",origin)
  console.log("DESTINATION: ",destination)
  const [pin, setPin] = React.useState (origin) // Initial location

  return (
    <View>
    <MapView 
      style={styles.map} 
      initialRegion={initialRegion}
      showsUserLocation>

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
        }}>

        <Callout>
          <Text>Current location</Text>
        </Callout>

      </Marker>

      <Marker 
        coordinate={destination}
        pinColor="green"
        draggable={true}
        onDragStart={(e) => {
          console.log("Drag starts", e.nativeEvent.coordinate)
        }}
        onDragEnd={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }}>

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
        apikey={GOOGLE_MAPS_APIKEY}/>
        
    </MapView>
    <TouchableOpacity style={styles.ViewJourneyBtn}>
          <Text style={styles.homePageBtnText} onPress={addToJourney}>Join Journey</Text>
    </TouchableOpacity>
    <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setUserID(text)}
          />
    </View>
  )
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
  },
  inputText:{
    height:50,
    color: "white",
    textAlign: 'center'
  },
});
export default Map;