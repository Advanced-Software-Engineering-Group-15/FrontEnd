import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBigzrmp9B-yKgexQZSjtLvEiVzmdnAPy8';

const GooglePlacesInput = () => (
  <GooglePlacesAutocomplete
    placeholder="Search"
    onPress={(data, details = null) => {
      console.log(data, details);
    }}
    query={{
      key: GOOGLE_MAPS_APIKEY,
      language: 'en',
      components: 'country:ie',
    }}
    currentLocation
    currentLocationLabel="Current location"
  />
);

export default GooglePlacesInput;
