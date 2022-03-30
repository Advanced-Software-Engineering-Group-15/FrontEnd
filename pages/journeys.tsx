import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import NumericInput from "react-native-numeric-input";
import AvailableJourneyCard from '../components/AvailableJourneyCard';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IP } from '../constants';

const localHost = 'http://' + IP + '/journeys'
const maxPrice = ["None", 5, 10, 15, 20, 25, 30, "30+"]
const minRate = ["None", 1, 2, 3, 4, 5]
const journeyType_withImage = [
  { title:"None",},
  { title: "DRIVING", image: require("../images/driving.png") },
  { title: "WALKING", image: require("../images/walking.jpg") },
  { title: "BICYCLING", image: require("../images/cycling.jpg") },
  { title: "Taxi", image: require("../images/taxi.jpg") },
];

const Journeys = (props: any) => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // const [journeys_filter_final, setJourneyList] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      // console.log(JSON.stringify(json.exJourneys,  null, 2))
      setData(json.exJourneys);
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  let displayFilter = {
    method: '',
    maxPrice: '',
    minRate: '',
  };

  var journeys_filter_final = []
  if(data.length != 0){
    for (let i = 0; i < data.length; i++){
      // console.log(journeys_filter_1[i]["journeyID"])
      // setJourneyList(data[i])
      journeys_filter_final.push(data[i]);
      //   <View key={data[i]["journeyID"]}> 
      //     <AvailableJourneyCard data={data[i]} navigation={props.navigation}/>
      //   </View>
      // );
    }
  }
  else {
    <View style={styles.container}> 
      <Text  style={styles.titleText}>No Journeys</Text> 
    </View>
  }

  const json_filter = () =>{
    var filter_var = {
      method: displayFilter.method,
      maxPrice: displayFilter.maxPrice,
      minRate: displayFilter.minRate,
    };

    for( var i = 0; i < data.length; i++){ 
      if(filter_var.method !== ''){
        if(filter_var.method !== data[i].journeyType){
          console.log('asdasdasda')
          journeys_filter_final.splice(i, i + 1)
        }
      }
    }

    // journeys_filter_final = [];
    // if(data.length != 0){
    //   for (let i = 0; i < data.length; i++){
    //     // console.log(journeys_filter_1[i]["journeyID"])
    //     journeys_filter_final.push(
    //       <View key={data[i]["journeyID"]}> 
    //         <AvailableJourneyCard data={data[i]} navigation={props.navigation}/>
    //       </View>
    //     );
    //   }
    //   console.log(journeys_filter_final.length)
    //   for( var i = 0; i < data.length; i++){ 
    //     if(filter_var.method !== ''){
    //       if(filter_var.method !== data[i].journeyType){
    //         console.log('asdasdasda')
    //         journeys_filter_final.splice(i, i + 1)
    //       }
    //     }
    //   }
    // }    
    // else {
    //   journeys_filter_final = []
    //   journeys_filter_final.push(
    //     <View style={styles.container}> 
    //       <Text  style={styles.titleText}>No Journeys</Text> 
    //     </View>
    //   );
    // }

  
  }

  // const data = props.navigation.state.params //journeys received from server
  //create array of journeys as react components, these will be rendered to screen
  //Key is there to keep react happy, lets it identify an item by the key
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text  style={styles.titleText}>Available Journeys</Text> 
      <View style={styles.dropdownsRow}>

        <SelectDropdown
          data={journeyType_withImage}
          defaultButtonText={"Select method"}
          buttonStyle={styles.dropdownBtnStyle_1}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            displayFilter.method = selectedItem.title;
          }}
          rowStyle={styles.dropdownRowStyle_1}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdownBtnChildStyle_1}>
                <Text style={styles.dropdownBtnTxtStyle_1}>
                  {selectedItem ? selectedItem.title : "Select method"}
                </Text>
                <FontAwesome name="chevron-down" color={"#444"} size={11}/>
              </View>
            );
          }}
          dropdownStyle={styles.dropdownDropdownStyle_1}
          
          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={styles.dropdownRowChildStyle_1}>
                <Image source={item.image} style={styles.dropdownImageStyle_1} />
                <Text style={styles.dropdownRowTxtStyle_1}>{item.title}</Text>
              </View>
            );
          }}
        />

        <SelectDropdown     // Maximum price
          data={maxPrice}
          defaultButtonText={"Set price"}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            displayFilter.maxPrice = selectedItem.title;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownBtnStyle_2}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdownDropdownStyle_1}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_2}
        />
        
        <SelectDropdown     // Maximum price
          data={minRate}
          defaultButtonText={"Min rate"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            displayFilter.minRate = selectedItem.title;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownBtnStyle_3}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdownDropdownStyle_1}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_3}
        />

      </View>

      <TouchableOpacity style={styles.applyButt}>
        <Text style={styles.applyButtTxt} onPress={json_filter}>Apply</Text>
      </TouchableOpacity>

      <ScrollView>       
        <View style={styles.items}>
          {journeys_filter_final.map((journeyCard) =>{
            return (
              <View>
                <Text>{journeyCard["journeyID"]}</Text>
              </View>
            )
          })}
        </View> 
      </ScrollView>  
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    paddingTop: 50,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#34495e',
  },
  viewContainer: {
    flex: 1,
  },
  items: {
    flex: 1,
    padding: 10,
    marginHorizontal: 0,
  },

  dropdownsRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
  },
  dropdownBtnStyle_1: {
    width: "40%",
    height: 40,
    backgroundColor: "#bfb",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdownBtnTxtStyle_1: { fontSize: 13, color: "#555555", textAlign: "left" },
  dropdownDropdownStyle_1: { backgroundColor: "#EFEFEF" },
  dropdownRowStyle_1: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#444",
    height: 50,
  },
  dropdownRowTxtStyle_1: {
    color: "#111111",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16,
    position: 'absolute', 
    left: 50,
  },
  dropdownImageStyle_1: { width: 45, height: 45, resizeMode: "cover", position: 'absolute', left: 0},
  dropdownBtnChildStyle_1:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownRowChildStyle_1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  dropdownBtnStyle_2: {
    width: "30%",
    height: 40,
    backgroundColor: "#FBB",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdownRowTxtStyle_2: {
    color: "#111111",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },

  dropdownBtnStyle_3: {
    width: "30%",
    height: 40,
    backgroundColor: "#BBF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdownRowTxtStyle_3: {
    color: "#111111",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  // try

  dropdown3DropdownStyle: { backgroundColor: "slategray" },
  dropdown3RowStyle: {
    
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: "cover", position: 'absolute', left: 0,},
  dropdown3RowTxt: {
    color: "#111111",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 20,
    position: 'absolute', 
    left: 50,
  },
  applyButt:{
    width: "24%",
    backgroundColor: "#33FF99",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 265,
  },
  applyButtTxt:{
    color: "#111111",
    textAlign: "center",
    fontWeight: "bold",
  }
});

export default Journeys;
