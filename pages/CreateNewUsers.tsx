import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { IP } from '../constants';

const CreateNewUserPage = (props: any) => {
  const [warning, setWarning] = useState(0);
  const [warning_msg, setWarning_msg] = useState('');
  let newUser_json = {
    firstName: '',
    familyName: '',
    phoneNumber: '',
    emailAddress: '',
    homeAddress: '',
    userName: '', 
    password: '',
    repeated_password: '',
    userID: '2000',
  };

  const SendNewUser = () => {
    let localHost = 'http://' + IP + '/new-user'
    var json_data = {
      "firstName": newUser_json.firstName,
      "familyName": newUser_json.familyName,
      "phoneNumber": newUser_json.phoneNumber,
      "emailAddress": newUser_json.emailAddress,
      "homeAddress": newUser_json.homeAddress,
      "userName": newUser_json.userName,
      "password": newUser_json.password,
      "repeated_password": newUser_json.repeated_password,
      "userID": newUser_json.userID,
    }
    // let check_blank = newUser_json.firstName.concat(
    //   newUser_json.userName,
    //   newUser_json.firstName,
    //   newUser_json.familyName,
    //   newUser_json.phoneNumber,
    //   newUser_json.emailAddress,
    //   newUser_json.password,
    //   newUser_json.repeated_password,
    // );

    if (json_data["userName"] === "" || json_data["firstName"] === "" || json_data["familyName"] === "" || json_data["phoneNumber"] === "" 
        || json_data["emailAddress"] === "" || json_data["password"] === "" ||  json_data["repeated_password"] === ""){
      console.log("There are blanks to be filled.")
      setWarning(1)
      setWarning_msg("Please fill the mandatory field.")
    }
    else{
      if (newUser_json.password !== newUser_json.repeated_password){
        console.log("Passwords are different!!")
        setWarning(1)
        setWarning_msg("The input passwords are different.")
      }
      else{
        setWarning(0)  
        axios.post(localHost, {
          body: JSON.stringify(json_data)
        })
        .then(function (response) {
          if (response) {
            console.log(response);
            // Check for login status
            
            props.navigation.navigate("Login", {
              username: newUser_json.userName,
              password: newUser_json.password,
              useID: newUser_json.userID,
            })
          }
          else{
            console.log("Sign in failed")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  };

  return (
    
    <SafeAreaView  style={styles.container}>
      <ScrollView>
        <Text style={styles.title1}>Welcome to Carma! </Text>
        <Text style={styles.title2}>Welcome to Carma! </Text>
        <Text style={styles.title3}>Welcome to Carma! </Text>
        <Text style={styles.note}>Please fill in the following blanks: </Text>
        <Text style={styles.questions}>1.* Username: </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.userName = text}}/>
        </View>
        <Text style={styles.questions}>1.* First Name: </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="First Name..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.firstName = text}}/>
        </View>
        <Text style={styles.questions}>2.* Family Name: </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Family Name..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.familyName = text}}/>
        </View>
        <Text style={styles.questions}>3.* Phone Number: </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Phone Number..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.phoneNumber = text}}/>
        </View>
        <Text style={styles.questions}>4.* Email Address: </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email Address..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.emailAddress = text}}/>
        </View>
        <Text style={styles.questions}>5. Home Address (Optional): </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Home Address (Optional)..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.homeAddress = text}}/>
        </View>
        <Text style={styles.questions}>6.* Password: </Text>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.password = text}}/>
        </View>
        <Text style={styles.questions}>7.* Repeat password: </Text>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Repeat password..." 
            placeholderTextColor="#C0C0C0"
            onChangeText={(text) => {newUser_json.repeated_password = text}}/>
        </View>
        {warning ? 
          <Text style={styles.warning}>{warning_msg}</Text> : 
          null
        }
        <TouchableOpacity style={styles.finishBtn}>
          <Text 
            style={styles.questions} 
            onPress={SendNewUser}
            >SIGN UP
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
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
  warning: {
    fontWeight: "bold", 
    fontSize: 17,
    color: "red",
    alignItems: 'flex-start',
    marginTop:10,
    justifyContent: 'center',
  },
  inputView:{
    width:"70%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  finishBtn:{
    width:"35%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:50,
    marginBottom:10
  },


});
  
export default CreateNewUserPage