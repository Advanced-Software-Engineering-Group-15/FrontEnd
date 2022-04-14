// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../constants.tsx';

const OriginIn = (props: any) => {
  const journeyType = props.navigation.state.params.journeyType;
  const currentStatus = props.navigation.state.params.currentStatus;
  const userProps = props.navigation.state.params.userProps;
  const initialRegion = {
    latitude: Number(53.338165314),
    longitude: Number(-6.256165642),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661,
  };
  const region = initialRegion;

  const [sendinfo, originInfo] = React.useState({});

  const [pin, setPin] = React.useState({
    latitude: Number(53.338165314),
    longitude: Number(-6.256165642),
    latitudeDelta: 0.000281,
    longitudeDelta: 0.002661,
  });

  const destinationPage = () => {
    props.navigation.navigate('DestinationIn', {
      origin: sendinfo,
      location: pin,
      journeyType,
      userProps,
      currentStatus,
    });
  };

  return (

    <View>
      <ScrollView keyboardShouldPersistTaps="handled">

        <GooglePlacesAutocomplete
          placeholder="Enter your origin"
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          fetchDetails // you need this to fetch the details object onPress
          onPress={(data, details = null) => {
            // console.log(data, details)
            // console.log(JSON.stringify(details?.geometry?.location));
            region.latitude = Number(JSON.stringify(details?.geometry?.location.lat));
            region.longitude = Number(JSON.stringify(details?.geometry?.location.lng));
            setPin(region);
            originInfo({ data });
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
            components: 'country:ie',
          }}
          currentLocation
          currentLocationLabel="Current location"
        />

        <MapView
          style={styles.map}
          initialRegion={pin}
          region={pin}
          showsUserLocation
        >
          <Marker
            coordinate={pin}
            pinColor="green"
          />
        </MapView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.ViewJourneyBtn} onPress={destinationPage}>
            <Text style={styles.homePageBtnText}>Confirm origin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>

  );
};

// styling

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    height: 50,
    color: 'white',
    fontSize: 25,
  },
  map: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height - 200),
  },
  searchBox: {
    top: 0,
    position: 'absolute',
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
  MapsPageBtn: {
    width: '40%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  ViewJourneyBtn: {
    width: '40%',
    backgroundColor: '#33FF99',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default OriginIn;
