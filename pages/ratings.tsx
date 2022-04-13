<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Button, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Rating, RatingProps } from 'react-native-elements';
import axios from 'axios';
import { IP } from '../constants.tsx';

let url = 'http://' + IP + '/rating'

=======
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { Rating } from 'react-native-elements';
>>>>>>> 1e9942a4b1c23a2d6efe82584ad4a334ba56950c

type RatingsComponentProps = {};

const Ratings: React.FunctionComponent<RatingsComponentProps> = (props: any) => {
<<<<<<< HEAD
  const [rate, setRating] = useState(0);
  // console.log('\n\n\nRating props:', props.navigation.state.params.userProps.userID)
  const userID = props.navigation.state.params.userProps.userID
  const confirmRating = () => {
    console.log('Coinfirmed Rating is: ', rate)
    axios.post(url, {
      body: JSON.stringify({
        "userID": userID,
        "rating": rate.toString()
      })
    })
    .then(function (response) {
      console.log('RESPONSE', response.data) 
    })
  }

  const changeRating = (rating: number) => {
    setRating(rating)
    console.log('Rating is: ', rating)
=======
  const [rate, setRating] = useState({ rate: 0 });
  const ratingConfirm = (rating: number) => {
    setRating({ rate: rating });
    return Alert.alert(
      'Are your sure?',
      `Confirm Journey Rating of: ${rating} stars`,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            props.navigation.navigate('Home');
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
>>>>>>> 1e9942a4b1c23a2d6efe82584ad4a334ba56950c
  };

  const alertTest = () => Alert.alert(
    'Are your sure?',
    `Confirm Journey Rating of :${rate}stars`,
    [
      // The "Yes" button
      {
        text: 'Yes',
      },
      {
        text: 'No',
      },
    ],
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.viewContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <Rating
            showRating
            imageSize={40}
            onFinishRating={changeRating}
            startingValue="{0}"
            style={{ paddingVertical: 10 }}
          />
          <TouchableOpacity style={styles.confirmBtn}>
<<<<<<< HEAD
          <Text 
          style={styles.confirmText}
          onPress={confirmRating}
          >Confirm</Text>
        </TouchableOpacity>
=======
            <Text
              style={styles.confirmText}
              onPress={alertTest}
            >
              Confirm
            </Text>
          </TouchableOpacity>
>>>>>>> 1e9942a4b1c23a2d6efe82584ad4a334ba56950c
          {/* <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={3.6}
            readonly
            imageSize={40}
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <Rating
            type="custom"
            ratingColor="#3498db"
            ratingCount={10}
            imageSize={30}
            onFinishRating={ratingCompleted}
            showRating
            style={{ paddingVertical: 10 }}
          />
          <Rating
            type="heart"
            ratingCount={3}
            fractions={2}
            startingValue={1.57}
            imageSize={40}
            onFinishRating={ratingCompleted}
            showRating
            style={styles.rating}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    paddingTop: 50,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#34495e',
  },
  viewContainer: {
    flex: 1,
  },
  rating: {
    paddingVertical: 10,
  },
  confirmBtn: {
    width: '60%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  confirmText: {
    color: 'white',
  },
});

export default Ratings;
