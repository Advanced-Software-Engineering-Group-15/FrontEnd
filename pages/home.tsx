// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, RefreshControlBase,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IP } from '../constants';

const localHost = 'http://' + IP + '/passengers'
const journeysURL = 'http://' + IP + '/journeys'


function Home(props: any) {
  const [passengerData, setPassengerData] = useState([]);
  const [data, setData] = useState([]);
  const [creatorData, setCreatorData] = useState([]);
  const [matchingJourneys, setMatchingJourneys] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const username  = props.navigation.state.params.userProps.name;
  const userProps  = props.navigation.state.params.userProps;
  const signIn = props.navigation.state.params.signIn;
  console.log('username is: ', username)
  console.log('userProps is: ', userProps)
  const isCreator = userProps.isCreator;
  console.log(isCreator)
  

  useEffect(() => {
    console.log("Running useEffect")
    getData()
    getPassengerData() 
    getCreatorData() 
    
  }, [signIn]);
  console.log('passenger data out of function: ', passengerData)
  console.log('creator data out of function: ', creatorData.length)
  console.log('journey data out of function: ', data)
  const refresh = () => {
    getData()
    getPassengerData() 
    getCreatorData()
  }
  const getPassengerData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      await new Promise((resolve) => {
        console.log('json file content: ', json.exPassengers)
        setPassengerData(json.exPassengers)
        return resolve(json.exPassengers)
      }).then(msg => {
        initialPassengerData(msg);
      })
    } 
    catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  // console.log('passenger data out of function: ', passengerData)
  // console.log('creator data out of function: ', creatorData.length)
  // console.log('journey data out of function: ', data[0])

  const getData = async () => {
    try {
      const response = await fetch(journeysURL);
      const json = await response.json();
      console.log("json",json)
      console.log("json.exJourneys",json.exJourneys)
      await new Promise((resolve) => {
      console.log("json2",json)
      console.log("json.exJourneys2",json.exJourneys)
        setData(json.exJourneys)
        return resolve(json.exJourneys)
      }).then(msg => {
        initialData(msg);
      })
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const getCreatorData = async () => {
    try {
      const response = await fetch(journeysURL);
      const json = await response.json();
      await new Promise((resolve) => {
       // console.log('json file content: ', json.exPassengers)
        setCreatorData(json.exJourneys)
        return resolve(json.exJourneys)
      }).then(msg => {
        initialCreatorData(msg);
      })
    } 
    catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  
  const initialPassengerData = async (msg) => {
    var matchingJourneys = [];
    // console.log("asdasdasd!")
    // console.log('passenger journeys', msg)
    var journeys_filter_final_temp = [];
    for( var i = 0; i < msg.length; i++){ 
      if(userProps.userID == msg[i]["userID"]){
            matchingJourneys.push(msg[i])
          }
        }
    //console.log(data)
    if(matchingJourneys.length != 0){
     // console.log('Matching Journeys: ', matchingJourneys)
      setPassengerData(matchingJourneys)
    }
    else {
     // console.log('no matching journeys')
    }
  }

  const initialData = async (msg) => {
    var matchingJourneys = [];
    // console.log("asdasdasd!")
    // console.log('journeys list', msg.length)
    // console.log('passengerJourneys: ', passengerData)
    // console.log('passengerData', passengerData)
    // console.log('Data: ', data)
    var journeys_filter_final_temp = [];
    for( var i = 0; i < msg.length; i++){
      for (var j = 0; j < passengerData.length; j++) {
      if(passengerData[j]["journeyID"] == msg[i]["journeyID"]){
            matchingJourneys.push(msg[i])
          }
         else {//console.log('not matched')
        } 
        }
    }
    //console.log(data)
    if(matchingJourneys.length != 0){
      //console.log('Matching Journeys: ', matchingJourneys)
    }
    else {
      //console.log('no matching journeys')
    }
  }

  const initialCreatorData = async (msg) => {
    var matchingJourneys = [];
    // console.log("asdasdasd!")
    // console.log('passenger journeys', msg)
    var journeys_filter_final_temp = [];
    for( var i = 0; i < msg.length; i++){ 
      if(userProps.userID == msg[i]["creatorID"]){
            matchingJourneys.push(msg[i])
          }
        }
    //console.log(data)
    if(matchingJourneys.length != 0){
     // console.log('Matching Journeys: ', matchingJourneys)
      setCreatorData(matchingJourneys)
    }
    else {
      setCreatorData([])
     // console.log('no matching journeys')
    }
  }

  if (!signIn){
    console.log("navigated from page other than signin")
    // props.navigation.navigate('Ratings');
    // getData()
    // getPassengerData() 
    // getCreatorData() 
  }
  // const viewJourneysPage = () => {
  //   props.navigation.navigate('ViewJourneys', {passengerData: passengerData,data : data, userProps: userProps});
  // }

  // const viewCreatedJourneysPage = () => {
  //   props.navigation.navigate('ViewCreatedJourneys', {creatorData: creatorData, data : data, userProps: userProps});
  // }

  const RatingPage = () => {
    props.navigation.navigate('Ratings', {userProps});
    console.log(userProps)
  };

  const payment = () => {
    props.navigation.navigate('Payment', { username });
  };

  const journeys= () => {
    props.navigation.navigate("FindJourneys", { userProps })
  }
  
  const Create_Journey = () => {
    props.navigation.navigate("JourneyType", { username: username })
  }

  const createJourney = () => {
    props.navigation.navigate('JourneyType', { userProps });
  };

  const moreOptions = () => {
    props.navigation.navigate('MoreOptions', { username }); 
  };

  const myProfile = () => {
    props.navigation.navigate("MyProfile", { passengerData: passengerData,data : data, userProps: userProps, creatorData: creatorData, isCreator: isCreator  })
  }

  const journeyInProgress = () => {
    props.navigation.navigate('JourneyInProgress', { userProps });
  };
  return (
    <ScrollView style={styles.scrollBackground}>
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome back {'\n'}
        {username}!
      </Text>
      {/* <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={RatingPage}>Rating Page</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.ViewJourneyBtn} onPress={viewJourneysPage}>
        <Text style={styles.homePageBtnText} >Journeys</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ViewJourneyBtn} onPress={viewCreatedJourneysPage}>
        <Text style={styles.homePageBtnText} >Created Journeys</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={journeys}>Search Journeys</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={refresh}>Refresh</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={payment}>Payment Page</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.ViewJourneyBtn}>
        <Text style={styles.homePageBtnText} onPress={myProfile}>My Profile</Text>
      </TouchableOpacity>

      { isCreator == "true" &&
        <TouchableOpacity style={styles.ViewJourneyBtn}>
          <Text style={styles.homePageBtnText} onPress={createJourney}>Create Journey</Text>
        </TouchableOpacity>
        }

    </View>
    </ScrollView>
  );
}

// styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  scrollBackground: {
    backgroundColor: '#003f5c',
  },
  welcomeText: {
    height: 200,
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
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
});

export default Home;
