import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import NumericInput from "react-native-numeric-input";
import axios from 'axios';
const journeyType = ["Drive", "Cycle", "Walk"]
const currencyType = ["€", "$", "£"]
//const ip = '192.168.68.118'
const ip = '192.168.147.1'
const localHost = 'http://'+ ip +':5000/newJourneys'
// const User = (props) => {
// }

const App = (props: any) => {

  let journey = {
    type: '',
    start: '',
    end: '',
    currency: '$',
    cost: 0,
  };

  const logValue = () => {
    console.log(journey);
<<<<<<< HEAD
    // props.navigation.navigate("Home", { username: input })
    // props.navigation.navigate("Create_Journey", { journey})
=======
    
    //props.navigation.navigate("Home", { username: input })
    //props.navigation.navigate("Create_Journey", { journey})
    var data = {
      "type": journey.type, 
      "start": journey.start, 
      "end": journey.end, 
      "currency": journey.currency, 
      "cost": journey.cost, 
    }
    axios.post(localHost, {
      body: JSON.stringify(data)
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   
  //  fetch(localHost, {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body:  JSON.stringify(data)
  //  })
  //  .then(function(response){ 
  //   return response.json();   
  //  })
  //  .then(function(data){ 
  //  console.log(data)
  //  });
>>>>>>> origin/master
  };

  return (
    <ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //display: 'inline-flex',
        
      }}>
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        <SelectDropdown
          data={journeyType}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            journey.type = selectedItem;
          }}
          defaultButtonText={"Select Journey Type"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />


        <Text>Start of Journey:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => journey.start = text}/>
        <Text>End of Journey:</Text>
        <TextInput
        style={styles.input}
        onChangeText={text => journey.end = text}/>
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        <Text>Cost of Journey:</Text>
        <View style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SelectDropdown
          dropdownStyle = {{
            width:50,
          }}
          buttonStyle = {{
            width:50,
          }}

          data={currencyType}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            journey.currency = selectedItem;
          }}
          defaultButtonText={"$"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        <NumericInput      
        onChange={value => journey.cost = value}
        />
        </View>
        <Button
          onPress={logValue}
          title="Submit Journey"
          color="#841584"
          accessibilityLabel="Submit your journey to be created"
        />
      </View>
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
  loginBtn:{
    width:"80%",
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

export default App;