import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';
import { Rating } from 'react-native-elements';
import axios from 'axios';
import { IP } from '../constants.tsx';

const url = `http://${IP}/rating`;

type RatingsComponentProps = {};

const Ratings: React.FunctionComponent<RatingsComponentProps> = (props: any) => {
  const [rate, setRating] = useState(0);
  const userProps = props.navigation.state.params.userProps;
  const creatorID = props.navigation.state.params.creatorID;

  const goBack = () => {
    props.navigation.navigate('Home', { userProps });
  };

  const confirmRating = () => {
    console.log('Coinfirmed Rating is: ', rate);
    axios.post(url, {
      body: JSON.stringify({
        userID: creatorID,
        rating: rate.toString(),
      }),
    })
      .then((response) => {
        console.log('RESPONSE', response.data);
      });
    goBack();
  };

  const changeRating = (rating: number) => {
    setRating(rating);
    console.log('Rating is: ', rating);
  };

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
          <TouchableOpacity style={styles.confirmBtn} onPress={confirmRating}>
            <Text
              style={styles.confirmText}
            >
              Confirm
            </Text>
          </TouchableOpacity>
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
