import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AvailableJourneyCard from '../components/AvailableJourneyCard.tsx';
import { IP } from '../constants.tsx';

const localHost = 'http://' + IP + '/journeys'
const maxPrice = ["None", 5, 10, 15, 20, 25, 30]
const minRate = ["None", 1, 2, 3, 4, 5]
const distance = ["None", 1, 2, 5, 10, 20]
const journeyType_withImage = [
  { title: "None",},
  { title: "DRIVING", image: require("../images/driving.png") },
  { title: "WALKING", image: require("../images/walking.jpg") },
  { title: "BICYCLING", image: require("../images/cycling.jpg") },
  { title: "Taxi", image: require("../images/taxi.jpg") },
];

const Journeys = (props: any) => {
  const idealJourney = props.navigation.state.params;

  const origin = idealJourney.origin;
  const dest = idealJourney.dest;


  const [Filtered, setFiltered] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [journeysFiltered, setJourneysFiltered] = useState([]);
  const [methodFilter, setMethodFilter] = useState('None');
  const [maxPriceFilter, setMaxPriceFilter] = useState('None');
  const [minRateFilter, setMinRateFilter] = useState('None');
  const [distFilter, setDistFilter] = useState('None');
  const [journeys_filter_final, setFinalList] = useState([]);
  const [journeys_filter_initial, setInitialList] = useState([]);

  useEffect(() => {
    getData() 
    
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      await new Promise((resolve) => {
        setData(json.exJourneys)
        return resolve(json.exJourneys)
      }).then(msg => {
        initialData(msg);
      })
    } catch (error) { 
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const distCalc = (region1, region2) =>{

    let lat1 = region1.latitude;
    let lat2 = region2.latitude;
    let lon1 = region1.longitude;
    let lon2 = region2.longitude;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
     
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
             Math.cos(φ1) * Math.cos(φ2) *
             Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c/1000;
    console.log('Calc Dist: ',d)
    
    return d; // in metres
  }

  const distanceComp = ( region1, region2, distFilter) => {
    console.log(distCalc(region1, region2),distFilter)
    if (distCalc(region1, region2) <= distFilter){
      console.log('True')
      return true
    }
    return false
  }


  const isInDistance = ( origin1, origin2, dest1, dest2, distFilter) => {
    if (distanceComp(origin1, origin2, distFilter) && distanceComp(dest1, dest2, distFilter)){
      console.log('True')
      return true
    }
    return false
  }

  const filterData = async () => {
    var matchingJourneys = [];
    console.log("asdasdasd!")
    console.log(data)
    var journeys_filter_final_temp = [];
    for( var i = 0; i < data.length; i++){ 
      if(methodFilter == data[i]["journeyType"] || methodFilter == "None"){
        if(parseFloat(maxPriceFilter) >= data[i]["cost"] || maxPriceFilter == "None"){
          if(parseFloat(minRateFilter) <= data[i]["creatorRating"] || minRateFilter == "None"){
            console.log(typeof(distFilter))
            if( isInDistance(origin, {latitude: data[i].startLat, longitude: data[i].startLong}, dest, {latitude: data[i].endLat, longitude: data[i].endLong}, parseFloat(distFilter)) || distFilter == "None"){
              matchingJourneys.push(data[i])
          }
        }
      }
      }
    }
    //console.log(data)
    if(matchingJourneys.length != 0){
      for (let i = 0; i < matchingJourneys.length; i++){
        journeys_filter_final_temp.push(
          <View key={matchingJourneys[i]["journeyID"]}>
            <AvailableJourneyCard data={matchingJourneys[i]} navigation={props.navigation}/>
          </View>
        );
      }
    }
    else {
      journeys_filter_final_temp.push(
        <View style={styles.container}> 
          <Text  style={styles.titleText}>No Journeys</Text> 
        </View>
      )
    }
    setFinalList(journeys_filter_final_temp);
}


  const initialData = async (msg) => {
    var matchingJourneys = [];
    console.log("asdasdasd!")
    console.log(msg)
    var journeys_filter_final_temp = [];
    for( var i = 0; i < msg.length; i++){ 
      if(methodFilter == msg[i]["journeyType"] || methodFilter == "None"){
        if(parseFloat(maxPriceFilter) >= msg[i]["cost"] || maxPriceFilter == "None"){
          if(parseFloat(minRateFilter) <= msg[i]["creatorRating"] || minRateFilter == "None"){
            matchingJourneys.push(msg[i])
          }
        }
      }
    }
    //console.log(data)
    if(matchingJourneys.length != 0){
      for (let i = 0; i < matchingJourneys.length; i++){
        journeys_filter_final_temp.push(
          <View key={matchingJourneys[i]["journeyID"]}>
            <AvailableJourneyCard data={matchingJourneys[i]} navigation={props.navigation}/>
          </View>
        );
      }
    }
    else {
      journeys_filter_final_temp.push(
        <View style={styles.container}> 
          <Text  style={styles.titleText}>No Journeys</Text> 
        </View>
      )
    }
    setFinalList(journeys_filter_final_temp);
  }


  // const data = props.navigation.state.params //journeys received from server
  //create array of journeys as react components, these will be rendered to screen
  //Key is there to keep react happy, lets it identify an item by the key
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Available Journeys</Text> 
      <View style={styles.dropdownsRow}>

        <SelectDropdown
          data={journeyType_withImage}
          defaultButtonText={"Select method"}
          buttonStyle={styles.dropdownBtnStyle_1}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.title, index);
            //displayFilter.method = selectedItem.title;
            setMethodFilter(selectedItem.title)
            console.log(selectedItem.title)
          }}
          rowStyle={styles.dropdownRowStyle_1}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdownBtnChildStyle_1}>
                <Text style={styles.dropdownBtnTxtStyle_1}>
                  {selectedItem ? selectedItem.title : "Method"}
                </Text>
                <FontAwesome name="chevron-down" color={"#444"} size={12}/>
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
        
        <SelectDropdown     // Acceptable Distance
          data={distance}
          defaultButtonText={"Dist."} // Set allowed distance
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            setDistFilter(selectedItem);
            console.log(distFilter)
            console.log(selectedItem)
            //displayFilter.maxPrice = selectedItem.title;
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
                size={12}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdownDropdownStyle_1}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_2}
        />

        <SelectDropdown     // Maximum price
          data={maxPrice}
          defaultButtonText={"Price"}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            setMaxPriceFilter(selectedItem);
            //displayFilter.maxPrice = selectedItem.title;
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
                size={12}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdownDropdownStyle_1}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_2}
        />
        
        <SelectDropdown     // Min rate
          data={minRate}
          defaultButtonText={"Rate"}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setMinRateFilter(selectedItem);
            //displayFilter.minRate = selectedItem.title;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownBtnStyle_4}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={12}
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
        <Text style={styles.applyButtTxt} onPress={filterData}>Apply</Text>
      </TouchableOpacity>

      <ScrollView>       
        <View style={styles.items}>
          {journeys_filter_final}
        </View> 
      </ScrollView>  

      {/* {Filtered == true &&
        <ScrollView>      
          <View style={styles.items}>
            {journeys_filter_initial}
          </View> 
        </ScrollView>
      } */}
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
    marginHorizontal: 12,
  },

  dropdownsRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
  },
  dropdownBtnStyle_1: {
    width: "25%",
    height: 40,
    backgroundColor: "#AAFFFF",
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
    width: "25%",
    height: 40,
    backgroundColor: "#FFEEAA",
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
    width: "25%",
    height: 40,
    backgroundColor: "#99FF99",
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
    marginBottom: 10,
    marginLeft: 290,
  },
  applyButtTxt:{
    color: "#111111",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdownBtnStyle_4:{
    width: "25%",
    height: 40,
    backgroundColor: "#FFAAAA",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444",
  }
});

export default Journeys;
