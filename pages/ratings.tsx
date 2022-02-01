import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Rating, RatingProps } from 'react-native-elements';
import env from 'process'



type RatingsComponentProps = {};

const Ratings: React.FunctionComponent<RatingsComponentProps> = () => {
  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
  };

  const ratingProps = {};
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
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <Rating
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
          />
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
});

export default Ratings;