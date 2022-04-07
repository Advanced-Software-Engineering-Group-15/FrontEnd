// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView
} from 'react-native';
import { IP } from '../constants';
import PassengerJourneysCard from '../components/PassengerJourneysCard';

const localHost = 'http://' + IP + '/passengers'
const journeysURL = 'http://' + IP + '/journeys'

function ViewJourneys(props: any) {
    const [journeys_filter_final, setFinalList] = useState([]);  
  const passengerData = props.navigation.state.params.passengerData
  const data = props.navigation.state.params.data
  const [matchedJourneys, setMatchedJourneys] = useState([])
  const [isLoading, setLoading] = useState(true);
//   const username  = props.navigation.state.params.userProps.name;
  const userProps  = props.navigation.state.params.userProps;
//   console.log('username is: ', username)
//   console.log('userProps is: ', userProps)
//   console.log('passengerData: ', passengerData)  
//   console.log('Data: ', data.length)  

  useEffect(() => {
    matchJourneys()
    
  }, []);

  const matchJourneys = async () => {
    var matchingJourneys = [];
    var journeys_filter_final_temp = []
    for(var i=0; i < data.length; i++){
        console.log('Journey ID: ', data[i]["journeyID"])
        for(var j=0; j < passengerData.length; j++){
            console.log('passenger Journey ID: ', passengerData[j]["journeyID"])
            if(passengerData[j]["journeyID"] == data[i]["journeyID"]){
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

//   console.log('passenger data out of function: ', passengerData)
//   console.log('journey data out of function: ', data)
  console.log('data in matchedJourneys: ', matchedJourneys.length)


  const viewJourneys = () => {
    props.navigation.navigate('ViewJourneys', {passengerData, data, userProps});
  }

  const RatingPage = () => {
    props.navigation.navigate('Ratings');
  };


  return (
    <View style={styles.container}>
    <ScrollView>
    
             
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
    backgroundColor: '#003f5c',
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

export default ViewJourneys;

