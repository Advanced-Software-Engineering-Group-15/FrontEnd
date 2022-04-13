import React from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import uuid from "react-native-uuid";

const journeyTypes = ["DRIVING", "BICYCLING", "WALKING"]

// const localHost = 'http://'+ IP +'/newJourneys'

const JourneyType = (props: any) => {
    const {username} = props.navigation.state.params
    const userProps = props.navigation.state.params.userProps
    console.log(userProps, userProps.userID, userProps.username)

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
    creatorID: 'username',
    creatorRating: '2.5',
  };

  const createJourney = () => {
      if(journey.journeyType) {
        props.navigation.navigate("OriginIn", { userProps: userProps, journeyType: journey.journeyType })
      }

  };

  return (
    <ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
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

export default JourneyType; 