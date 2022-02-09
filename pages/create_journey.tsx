import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const journeyType = ["Drive", "Cycle", "Walk"]

// const User = (props) => {
// }

const App = (props: any) => {

  let journey = {
    type: '',
    start: '',
    end: '',
    cost: '0.0',
  };

  const logValue = () => {
    console.log(journey);
    //props.navigation.navigate("Home", { username: input })
    //props.navigation.navigate("Create_Journey", { journey})
  };

  return (
    <ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Select Journey Type:</Text>
        {/* https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/ */}
        <SelectDropdown
          data={journeyType}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            journey.type = selectedItem;
          }}
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
        <Text>Cost of Journey:</Text>
        <TextInput
        style={styles.input}
        onChangeText={text => journey.cost = text}/>


        <Button
          onPress={logValue}
          title="Create Journey"
          color="#841584"
          accessibilityLabel="Create Journey"
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