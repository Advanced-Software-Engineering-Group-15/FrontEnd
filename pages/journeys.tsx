import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AvailableJourneyCard from '../components/AvailableJourneyCard';

const ip = '192.168.68.122'
const localHost = 'http://'+ip+':5000/journeys'

const Journeys = (props: any) => {
  const data = props.navigation.state.params //journeys received from server
  console.log(JSON.stringify(data));
  //create array of journeys as react components, these will be rendered to screen
  //Key is there to keep react happy, lets it identify an item by the key
  var journeys = [];
  for (let i = 0; i < data.journeyData.length; i++) {
    journeys.push(
      <View key={data.journeyData[i]["journeyID"]}> 
        <AvailableJourneyCard data={data.journeyData[i]} navigation={props.navigation}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text  style={styles.titleText}>Available Journeys</Text> 
        <ScrollView> 
          <View style={styles.items}>{journeys}</View> 
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
  items: {
    flex: 1,
    padding: 20,
  }
});

export default Journeys;