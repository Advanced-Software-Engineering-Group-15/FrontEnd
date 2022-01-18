// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

const ip = 'your ip here'
const localHost = 'http://'+ip+':5000/journeys'
console.log(localHost)
const Home = (props: any) => {
  const username = props.navigation.state.params.username.username 

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      //console.log(JSON.stringify(json.exJourneys))
      setData(json.exJourneys);
      console.log(data[0].journeyStart)
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const logValue = () => {
    getData();
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {username}!</Text>
        <TouchableOpacity>
          <Text onPress={logValue}>Get Data</Text>
        </TouchableOpacity>
      </View>
  );
}

//styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    height:50,
    color:"white",
    fontSize:25
  },
});

export default Home