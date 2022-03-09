import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import NumericInput from "react-native-numeric-input";
import axios from 'axios';
import uuid from "react-native-uuid";
import { IP } from '../constants';
const journeyTypes = ["Drive", "Cycle", "Walk"]
const currencyTypes = ["€", "$", "£"]

const localHost = 'http://'+ IP +'/newJourneys'

const App = (props: any) => {
  const username = props.navigation.state.params.username
  let journey = {
    journeyID: uuid.v1(),
    journeyType: '',
    journeyStart: {
        name: '',
        latitude: "53.5399601",
        longitude: "6.4446056"
    },
    journeyEnd: {
      name: '',
      latitude: "53.5260758",
      longitude: "-6.4160728"
    },
    pricing:{
      currency: '$',
      quantity: 0
    },
    creatorID: username,
    creatorRating: '2.5',
  };

  const createJourney = () => {
    console.log(journey);
    
    //props.navigation.navigate("Home", { username: input })
    //props.navigation.navigate("Create_Journey", { journey})
    var data = {
      "journeyID": journey.journeyID,
      "journeyType": journey.journeyType,
      "journeyStart": journey.journeyStart,
      "journeyEnd": journey.journeyEnd,
      "pricing": journey.pricing,
      "creatorID": journey.creatorID,
      "creatorRating": journey.creatorRating
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
          data={journeyTypes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            journey.journeyType = selectedItem;
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
          onChangeText={text => journey.journeyStart.name = text}/>
        <Text>End of Journey:</Text>
        <TextInput
        style={styles.input}
        onChangeText={text => journey.journeyEnd.name = text}/>
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

          data={currencyTypes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            journey.pricing.currency = selectedItem;
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
        onChange={value => journey.pricing.quantity = value}
        />
        </View>
        <Button
          onPress={createJourney}
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