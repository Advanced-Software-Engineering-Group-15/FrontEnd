// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

  // const ip = '10.36.5.112'
  // const localHost = 'http://'+ip+':5000/'

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // const getData = async () => {
  //   try {
  //     const response = await fetch(localHost);
  //     const json = await response.json();
  //     console.log(JSON.stringify(json.msg))
  //     setData(json.msg);
  //   } catch (error) { 
  //     console.log(error);
  //   } finally {
  //     setLoading(false)
  //   }
  // }

const Home = (props: any) => {
  const username = props.navigation.state.params.username.username 
  
  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {username}!</Text>
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