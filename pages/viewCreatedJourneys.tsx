// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView
} from 'react-native';
import PassengerJourneysCard from '../components/PassengerJourneysCard';

function ViewCreatedJourneys(props: any) {
  const [journeys_filter_final, setFinalList] = useState([]);  
  const creatorData = props.navigation.state.params.creatorData
  const data = props.navigation.state.params.data
  const [matchedJourneys, setMatchedJourneys] = useState([])
  const userProps  = props.navigation.state.params.userProps;

  useEffect(() => {
    matchJourneys()
    
  }, [data]);

  const matchJourneys = async () => {
    var matchingJourneys = [];
    var journeys_filter_final_temp = []
    for(var i=0; i < data.length; i++){
        console.log('Journey ID: ', data[i]["journeyID"])
        for(var j=0; j < creatorData.length; j++){
            console.log('passenger Journey ID: ', creatorData[j]["journeyID"])
            if(creatorData[j]["journeyID"] == data[i]["journeyID"]){
                console.log("Status of journey", data[i]["Status"])
                matchingJourneys.push(data[i])
                console.log('matched')
              }
        else {console.log('not matched')}
        }
    }
    setMatchedJourneys(matchingJourneys)
    if(matchingJourneys.length != 0){
        for (let i = 0; i < matchingJourneys.length; i++){
          journeys_filter_final_temp.push(
            <View key={matchingJourneys[i]["journeyID"]}>
              <PassengerJourneysCard data={matchingJourneys[i]} navigation={props.navigation}/>
            </View>
          );
        }
      }
      else {
        journeys_filter_final_temp.push(
          <View style={styles.container}> 
            <Text  style={styles.titleText}>No Journeys</Text> 
          </View>
        )
      }
    setFinalList(journeys_filter_final_temp);  
    console.log('matching journeys array: ', matchingJourneys)
  }

  console.log('data in matchedJourneys: ', matchedJourneys.length)

  const RatingPage = () => {
    props.navigation.navigate('Ratings');
  };


  return (
    
    <View style={styles.container}>
        <ScrollView >
        <View style={styles.items}>
          {journeys_filter_final}
        </View> 
      
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={RatingPage}>Rating Page</Text>
      </TouchableOpacity>
      </ScrollView>  
    </View>
    
  );
}

// styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    height: 200,
    color: 'white',
    fontSize: 25,
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
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  items: {
    flex: 1,
    padding: 10,
    marginHorizontal: 12,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    color: '#27ae60',
  },
});

export default ViewCreatedJourneys;
