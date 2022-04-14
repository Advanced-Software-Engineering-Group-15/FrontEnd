// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { IP } from '../constants';

const localHost = 'http://'+ IP +'/journeyStatus'

function JourneyInProgress(props: any) {
  const Status = props.navigation.state.params.status
  console.log('\n\n\nhere', props.navigation.state.params)
  const { userProps } = props.navigation.state.params;
  const { creatorID } = props.navigation.state.params;
  const [currentStatus, setCurrentStatus] = useState("")

  const setToStarted = () => {
    var data = {
      "journeyID": props.navigation.state.params.journeyID,
      "Status": "Started"
    }

    axios.post(localHost, {
      body: JSON.stringify(data)
    })
    goBack()
  }

  const cancelJourney = () => {
    var data = {
      "journeyID": props.navigation.state.params.journeyID,
      "Status": "Cancelled"
    }

    axios.post(localHost, {
      body: JSON.stringify(data)
    })
    goBack()
  }

  const setToEnded = () => {
    var data = {
      "journeyID": props.navigation.state.params.journeyID,
      "Status": "Ended"
    }

    axios.post(localHost, {
      body: JSON.stringify(data)
    })
    goBack()
  }
  const goBack = () => {
    console.log("Status: ", currentStatus)
    props.navigation.navigate('Home', { userProps, signIn: false });
    checkStatus()
  };
  const checkStatus = () => {
    console.log("Status: ",currentStatus)
  }

  const ratingPage = () => {
    props.navigation.navigate('Ratings', {userProps: userProps, creatorID: creatorID});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        {'Welcome '}
        {userProps.username}
        !
      </Text>
      <Text style={styles.welcomeText}>Your Journey is in progress! 🚗</Text>
      
      {Status == "Pending" &&
      <TouchableOpacity style={styles.MapsPageBtn}onPress={setToStarted}>
      <Text >START JOURNEY</Text>
      </TouchableOpacity>
      }
      {Status == "Pending" &&
      <TouchableOpacity style={styles.MapsPageBtn}onPress={cancelJourney}>
      <Text >CANCEL</Text>
      </TouchableOpacity>
      }
      {Status == "Started" &&
      <TouchableOpacity style={styles.MapsPageBtn}onPress={setToEnded}>
      <Text >END JOURNEY</Text>
    </TouchableOpacity>
      }
      {Status == "Ended" &&
      <TouchableOpacity style={styles.MapsPageBtn} onPress={ratingPage}>
      <Text >Review Journey</Text>
    </TouchableOpacity>
      }
      <TouchableOpacity style={styles.MapsPageBtn}onPress={goBack}>
        <Text >Back to Homepage</Text>
      </TouchableOpacity>
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
    height: 50,
    color: 'white',
    fontSize: 25,
  },
  searchBox: {
    top: 0,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
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
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});
export default JourneyInProgress;
