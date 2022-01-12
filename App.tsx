import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

//what is returned on screen
export default function App() {

  const ip = ''
  const localHost = 'http://'+ip+':5000/'

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      console.log(JSON.stringify(json.msg))
      setData(json.msg);
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ backgroundColor: 'gray', flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center'}}>
      {isLoading ? <ActivityIndicator/> : (
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{data}</Text>   
      )}
    </View>
  );
};

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});