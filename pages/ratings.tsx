import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Rating } from 'react-native-elements';

type RatingsComponentProps = {};

const Ratings: React.FunctionComponent<RatingsComponentProps> = (props: any) => {

  const ratingConfirm = (rating: number) => {
    setRating({rate: rating})
    return Alert.alert(
      "Are your sure?",
      "Confirm Journey Rating of: " + rating + " stars",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            console.log('Rating is: ' + (rating));
            props.navigation.navigate("Home")
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
          onPress: () => {
            console.log('Rating was: ' + (rating));
          }
        },
      ]
    );
  };

  const alertTest = (rate) => {
    console.log('Testing Alert');
    return Alert.alert(
      "Are your sure?",
      "Confirm Journey Rating of :"+ rate + "stars",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            console.log('Rating is: '+ (rate-1));
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
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
            onFinishRating={ratingConfirm}
            startingValue="{0}"
            style={{ paddingVertical: 10 }}
          />
          <TouchableOpacity style={styles.confirmBtn}>
          <Text 
          style={styles.confirmText}
          onPress={alertTest}
          >Confirm</Text>
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
  confirmText:{
    color:"white"
  }
});

export default Ratings;