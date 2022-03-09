import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_MAPS_APIKEY='AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8'

const GooglePlacesInput = () => {

    return(
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: "country:ie",
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
      />  
    )
};

export default GooglePlacesInput;