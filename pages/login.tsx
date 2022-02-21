// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

const ip = '192.168.68.122'

const Login = (props: any) => {

  let login_json = {
    userName: '',
    password: ''
  };
  
  const SignIn = () => {
    let url = 'http://' + ip + ':5000/sign-in'
    var data = {
      "userName": login_json.userName,
      "password": login_json.password
    }
    console.log(data)
    axios.post(url, {
      body: JSON.stringify(data)
    })
    .then(function (response) {
      const isLogin = response.data.isLoginSuccessful;
      console.log(isLogin);
      if (isLogin) {     
        // Check for login status
        props.navigation.navigate("Home", {
          username: login_json.userName,
          password: login_json.password,
        })
      }
      else{
        console.log("Sign in failed")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
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
            onChangeText={(text) => {login_json.userName = text}}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => login_json.password = text}/>
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
    color: "white",
    textAlign: 'center'
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