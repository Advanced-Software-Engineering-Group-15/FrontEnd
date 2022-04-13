import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'

let region = {
    longitude: 0,
    latitude: 0      
}

const FindJourneys = (props: any) => {
  
  const userProps = props.navigation.state.params.userProps
  console.log('origin username', userProps.username)

  const [Origin, setOrigin] = React.useState ({})
  const [Dest, setDest] = React.useState ({})

  const journeysPage = () => {
  
    props.navigation.navigate("Journeys", {
      origin: Origin,
      dest: Dest,
      userProps: userProps
    })
  }

  return (    

    <View>
    <ScrollView keyboardShouldPersistTaps="handled">

      <GooglePlacesAutocomplete
        placeholder='Where are ye'
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        onPress={(data, details = null) => {
          console.log(details);
          //console.log(data, details)
          //console.log(JSON.stringify(details?.geometry?.location));

          region.latitude = Number(JSON.stringify(details?.geometry?.location.lat))
          region.longitude = Number(JSON.stringify(details?.geometry?.location.lng))
          setOrigin(region);
          console.log('region is: ', region)
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: "country:ie",
        }}
      />

      <GooglePlacesAutocomplete
        placeholder='Where are ye wantin to be'
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        onPress={(data, details = null) => {
          console.log(details);
          //console.log(data, details)
          //console.log(JSON.stringify(details?.geometry?.location));

          region.latitude = Number(JSON.stringify(details?.geometry?.location.lat))
          region.longitude = Number(JSON.stringify(details?.geometry?.location.lng))
          setDest(region);
          console.log('destination is: ', region)
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: "country:ie",
        }}
      />


    </ScrollView>
    <View  style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
    <TouchableOpacity style={styles.confirmBtn} onPress={journeysPage}>
          <Text style={styles.confirmText} >Confirm selection</Text>
    </TouchableOpacity>
    </View> 
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
  confirmText:{
    color:"white"
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
  confirmBtn:{
    width:"60%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});

export default FindJourneys;


