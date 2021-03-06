import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

const createdJourneysCard = (props: any) => {
  const goHome = () => {
    // console.log(input);
    props.navigation.navigate('Home', { username: 'comingFromJourneys' });
  };

  return (
    <TouchableOpacity onPress={goHome}>
      <View style={styles.items}>
        <Text>
          Journey ID:
          {JSON.stringify(props.data.journeyID)}
        </Text>
        <Text>
          Departure:
          {JSON.stringify(props.data.journeyStart[0].name)}
        </Text>
        <Text>
          Destination:
          {JSON.stringify(props.data.journeyEnd[0].name)}
        </Text>
        <Text>
          Journey type:
          {JSON.stringify(props.data.journeyType)}
        </Text>
        <Text>
          Pricing (
          {JSON.stringify(props.data.pricing[0].currency)}
          ):
          {JSON.stringify(props.data.pricing[0].quantity)}
        </Text>
        <Text>
          Creator ID:
          {JSON.stringify(props.data.creatorID)}
        </Text>
        <Text>
          Creator Rating:
          {JSON.stringify(props.data.creatorRating)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  items: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#27ae60',
    borderRadius: 50,
  },
});

export default createdJourneysCard;
