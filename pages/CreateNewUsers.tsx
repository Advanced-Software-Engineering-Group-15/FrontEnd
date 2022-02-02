import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';

const ip = '192.168.68.122'
const localHost = 'http://' + ip + ':5000/journeys'
console.log(localHost)

const CreateNewUserPage = (props: any) => {

  const [input, setInput] = useState({username: ""});

  const logValue = () => {
    //console.log(input);
    props.navigation.navigate("Home", { username: input })
  };


  return (
    <View style={styles.container}>
        <Text style={styles.title1}>Welcome to Carma! </Text>
        <Text style={styles.title2}>Welcome to Carma! </Text>
        <Text style={styles.title3}>Welcome to Carma! </Text>
        <Text style={styles.note}>Please fill in the following blanks: </Text>
        <Text style={styles.questions}>1. First Name: </Text>
        <Text style={styles.questions}>1. First Name: </Text>
        <Text style={styles.questions}>1. First Name: </Text>


    </View>
  ); 

}


//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
  },
  title1: {
    position: 'absolute',
    top: 4, left: 4, right: 0, bottom: 0, 
    fontWeight:"bold",
    fontStyle: "italic",
    fontSize: 40,
    color: "#EE1D52",
    marginBottom:40,
  },
  title2: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0, 
    fontWeight:"bold",
    fontStyle: "italic",
    fontSize: 40,
    color: "#69C9D0",
    marginBottom:40,
  },
  title3: {
    position: 'absolute',
    top: 2, left: 2, right: 0, bottom: 0, 
    fontWeight:"bold",
    fontStyle: "italic",
    fontSize: 40,
    color: "#010101",
    marginBottom:40,
  },
  note: {
    alignItems: 'flex-start',
    marginTop: 50,
    fontWeight:"bold",
    fontSize: 22,
    color: "black",
    
  },
  questions: {
    fontWeight: "bold", 
    fontSize: 17,
    color: "black",
    alignItems: 'flex-start',
    marginTop:10,
    justifyContent: 'center',
  },


});
  
export default CreateNewUserPage