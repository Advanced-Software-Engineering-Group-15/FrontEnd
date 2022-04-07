import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import NumericInput from "react-native-numeric-input";
import axios from 'axios';
import uuid from "react-native-uuid";
import { IP } from '../constants';

import DateTimePicker from '@react-native-community/datetimepicker';

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
  const userProps = inputProps.userProps;
  console.log(userProps.username, userProps.userID)
  //const [globalType, setGlobalType] = React.useState ("")
  console.log('Journey info obtained', props.navigation.state.params)
  console.log('userID', userProps.userID)
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
    creatorID: userProps.userID,
    creatorRating: '2.5',
    capacity: 1,
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const showTimepicker = () => {
    setShow(true);
    showMode('time');
  };



  // console.log(date)


  const createJourney = () => {

    // console.log(journey);
   
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
      "capacity": journey.capacity,
      "departure_datetime": date
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
      <View style={styles.items}>
        <Text style={styles.cardDepatureTxtStyle}>Start of Journey:</Text>
        <Text style={styles.cardDepatureInfoStyle}>{startInfo.data.description}</Text>
        <Text style = {styles.cardDestinationTxtStyle}>End of Journey:</Text>
        <Text style = {styles.cardDestinationInfoStyle}>{destInfo.data.description}</Text>

        <View style={styles.itemsNumericInput}>
          <Text style={styles.cardCapacityTxtStyle}>Max Capacity:                 </Text>
          <NumericInput  
            type='up-down'
            onChange={value => journey.capacity = value}
            onLimitReached={(isMax, msg) => console.log(isMax,'Reached the maximum capacity')}
            textColor='#5566EF' 
            rounded
            borderColor='#5566EF' 
            iconStyle={{ color:'#5566EF'}} 
          />
        </View>
        { journeyType == "DRIVING" &&
        <View style={styles.itemsNumericInput}>
          <Text style={styles.cardCostTxtStyle}>Cost of Journey:</Text>
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
            type='up-down'
            onChange={value => journey.pricing.quantity = value}
            onLimitReached={(isMax, msg) => console.log(isMax,'Reached the maximum capacity')}
            textColor='#FF9900' 
            rounded
            borderColor='#FF9900' 
            iconStyle={{ color:'#FF9900'}}             
          />          
        </View>
        }
      </View>
      <View style={styles.containerBtnStyle}>
        <DateTimePicker
          style={styles.datePickerStyle}
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
        <DateTimePicker
          style={styles.timePickerStyle}
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
        />
      </View>
        {/* <TouchableOpacity style={styles.pressBtnStyle} onPress={showDatepicker}>
          <Text style={styles.loginText}>
            SELECT DATE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pressBtnStyle} onPress={showTimepicker}>
            <Text style={styles.loginText}>
              SELECT TIME
            </Text>
        </TouchableOpacity> */}
      
      {/* {show && (
        
      )} */}
      <Text style={styles.timeTxtStyle}>selected: {date.toLocaleString()}</Text>

      <View style={styles.container}>
      
      
    
        <TouchableOpacity style={styles.pressBtnStyle} onPress={createJourney}>
          <Text 
            style={styles.loginText}
            >SUBMIT JOURNEY
          </Text>
        </TouchableOpacity>
      </View>
      
      
    </ScrollView>

  
  );


}
const styles = StyleSheet.create({
items: {
  marginBottom: 10,
  padding: 20,
},
itemsNumericInput: {
  marginBottom: 10,
  flexDirection: 'row',
  flex: 1,
},

cardDepatureTxtStyle: {
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
    color: '#226622',
    marginBottom: 15,
},

cardDepatureInfoStyle: {
  fontSize: 20,
  textAlign: "center",
  fontWeight: "bold",
  color: '#229922',
  marginBottom: 15,
},
cardDestinationTxtStyle: {
  fontSize: 25,
  textAlign: "left",
  fontWeight: "bold",
  color: '#BB2222',
  marginBottom: 15,
},
cardDestinationInfoStyle: {
  fontSize: 20,
  textAlign: "center",
  fontWeight: "bold",
  color: '#FF1111',
  marginBottom: 15,
},
cardCapacityTxtStyle: {
  fontSize: 22,
  textAlign: "left",
  fontWeight: "bold",
  color: '#5566EF',
  marginBottom: 15,
},
cardCostTxtStyle: {
  fontSize: 23,
  textAlign: "left",
  fontWeight: "bold",
  color: '#FF9900',
  marginBottom: 15,
  justifyContent:"center",
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
  containerBtnStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
  pressBtnStyle:{
    width:"40%",
    backgroundColor:"#333344",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:50
  },
  timeTxtStyle:{
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    color: '#444444',
    marginBottom: 15,
    justifyContent:"center",
  },
  datePickerStyle:{
    width:200,
    marginBottom: 25,
  },
  timePickerStyle:{
    width:100,
    marginBottom: 25,
  },
  loginText:{
    color:"white"
  }
});

export default App;