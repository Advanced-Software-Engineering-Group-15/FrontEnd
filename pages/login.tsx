// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

const ip = '192.168.68.122'

const Login = (props: any) => {
  
  const [input, setInput] = useState({username: ""});

  const SignIn = () => {
    let url = 'http://'+ ip +':5000/sign-in'
    axios.post(url, {
      username: input
    })
    .then(function (response) {
      if (response) {
        console.log(response);
        props.navigation.navigate("Home", { username: input })
      }
      else{
        console.log("Sign in failed")
      }
    })
  };

  const SignUp = () => {
    //console.log(input);
    props.navigation.navigate("CreateNewUserPage")
  };

  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Carma</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setInput({username: text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text 
            style={styles.loginText}
            onPress={SignIn}
            >LOGIN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={SignUp}>
            SIGN UP
          </Text>
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
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"70%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"35%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

export default Login