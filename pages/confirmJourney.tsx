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
  //const username = props.navigation.state.params.username
  const inputProps = props.navigation.state.params;
  const startLoc = inputProps.origin_location;
  const destLoc = inputProps.destination_location;
  const startInfo = inputProps.origin_info;
  const destInfo = inputProps.destination_info;
  const journeyType = inputProps.journeyType;
  const userName = inputProps.username;
  console.log(userName)
  //const [globalType, setGlobalType] = React.useState ("")
  console.log('Journey info obtained', props.navigation.state.params)
  let journey = {
    journeyID: uuid.v1(),
    journeyType: journeyType,
    journeyStart: {
        name: startInfo.data.description,
        latitude: startLoc.latitude,
        longitude: startLoc.longitude,
    },
    journeyEnd: {
      name: destInfo.data.description,
      latitude: destLoc.latitude,
      longitude: destLoc.longitude,
    },
    pricing:{
      currency: '$',
      quantity: 0
    },
    creatorID: userName,
    creatorRating: '2.5',
    capacity: 1,
  };

  const createJourney = () => {
    console.log("HERE\n\n\n\n")
    console.log(journey);
   
    var data = {
      "journeyID": journey.journeyID,
      "journeyType": journey.journeyType,
      "startName": journey.journeyStart.name,
      "startLat": journey.journeyStart.latitude,
      "startLong": journey.journeyStart.longitude,
      "endName": journey.journeyEnd.name,
      "endLat": journey.journeyEnd.latitude,
      "endLong": journey.journeyEnd.longitude,
      "currency": journey.pricing.currency,
      "cost": journey.pricing.quantity,
      "creatorID": journey.creatorID,
      "creatorRating": journey.creatorRating,
      "capacity": journey.capacity
    }

    axios.post(localHost, {
      body: JSON.stringify(data)
    })
    .then(function (response) {
      console.log(response);
      props.navigation.navigate("Home", { status: 'True'})
    })
    .catch(function (error) {
      console.log(error);
      props.navigation.navigate("Home", { status: 'False' })
    });
  };
  return (
    <ScrollView>
      <View style={
      //   {
      //   flex: 1,
      //   justifyContent: 'center',
      //   alignItems: 'center',  
      // }
      styles.items
      }>
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        {/* <SelectDropdown
          data={journeyTypes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            journey.journeyType = selectedItem;
            setGlobalType(journey.journeyType);          
          }}
          defaultButtonText={"Select Journey Type"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        /> */}


        <Text style={styles.cardDestinationTxtStyle}>Start of Journey:</Text>
        <Text>{startInfo.data.description}</Text>
        {/* <TextInput
          style={styles.input}
          onChangeText={text => journey.journeyStart.name = text}/> */}
        <Text style = {styles.cardDepatureTxtStyle}>End of Journey:</Text>
        <Text>{destInfo.data.description}</Text>

        <ScrollView>
          <Text style={styles.cardDestinationTxtStyle}>Max Capacity (excluding self):</Text>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NumericInput      
            onChange={value => journey.pricing.quantity = value}
          />
          </View> 
          </ScrollView>
        
        {/* <TextInput
        style={styles.input}
        onChangeText={text => journey.journeyEnd.name = text}/> */}
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        </View>
        { journeyType == "DRIVING" &&
          <ScrollView>
          <Text style={styles.cardDestinationTxtStyle}>Cost of Journey:</Text>
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
          </ScrollView>
        }
        {/* {this.renderCostInput(journey.journeyType)} */}
        
        
        <Button
          onPress={createJourney}
          title="Submit Journey"
          color="#841584"
          accessibilityLabel="Submit your journey to be created"
        />
      
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  items: {
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27ae60",
    borderRadius: 50,
},

cardDepatureTxtStyle: {
    fontSize: 17,
    textAlign: "left",
    fontWeight: "bold",
    color: '#FF2222',
},
cardDestinationTxtStyle: {
    fontSize: 17,
    textAlign: "left",
    fontWeight: "bold",
    color: '#22AA22',
},

cardTypeTxtStyle: {
    fontSize: 20,
    textAlign: "right",
    fontWeight: "bold",
    color: '#333333',
},
cardPriceTxtStyle: {
    fontSize: 20,
    textAlign: "right",
    marginRight: 20,
    fontWeight: "bold",
    color: '#FFA500',
},

cardUserTxtStyle: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    color: '#2222FF',
},
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