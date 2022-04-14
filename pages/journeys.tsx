import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AvailableJourneyCard from '../components/AvailableJourneyCard.tsx';
import { IP } from '../constants.tsx';

const localHost = `http://${IP}/journeys`;
const maxPrice = ['None', 5, 10, 15, 20, 25, 30];
const minRate = ['None', 1, 2, 3, 4, 5];
const distance = ['None', 1, 2, 5, 10, 20];
const imgDriving = require('../images/driving.png');
const imgWalking = require('../images/walking.jpg');
const imgBicycling = require('../images/cycling.jpg');
const imgTaxi = require('../images/taxi.jpg');

const journeyTypeWithImage = [
  { title: 'None' },
  { title: 'DRIVING', image: imgDriving },
  { title: 'WALKING', image: imgWalking },
  { title: 'BICYCLING', image: imgBicycling },
  { title: 'Taxi', image: imgTaxi },
];

const Journeys = (props: any) => {
  const idealJourney = props.navigation.state.params;

  const origin = idealJourney.origin;
  const dest = idealJourney.dest;

  const [data, setData] = useState([]);
  const [methodFilter, setMethodFilter] = useState('None');
  const [maxPriceFilter, setMaxPriceFilter] = useState('None');
  const [minRateFilter, setMinRateFilter] = useState('None');
  const [distFilter, setDistFilter] = useState('None');
  const [journeysFilterFinal, setFinalList] = useState([]);
  const [isDaily, setIsDaily] = useState('Pending');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(localHost);
      const json = await response.json();
      await new Promise((resolve) => {
        setData(json.exJourneys);
        return (
          resolve(json.exJourneys)
        );
      }).then((msg) => {
        initialData(msg);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('ERROR: Did not catch an error, but no journey is caught.');
    }
  };

  const distCalc = (region1, region2) => {
    const lat1 = region1.latitude;
    const lat2 = region2.latitude;
    const lon1 = region1.longitude;
    const lon2 = region2.longitude;
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
             + Math.cos(φ1) * Math.cos(φ2)
             * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = (R * c) / 1000;
    return d; // in metres
  };

  const distanceComp = (region1, region2, distFilter1) => {
    if (distCalc(region1, region2) <= distFilter1) {
      return true;
    }
    return false;
  };

  const isInDistance = (origin1, origin2, dest1, dest2, distFilter2) => {
    if (distanceComp(origin1, origin2, distFilter2) && distanceComp(dest1, dest2, distFilter2)) {
      return true;
    }
    return false;
  };

  const filterData = async () => {
    const matchingJourneys = [];
    const journeysFilterFinalTemp = [];
    for (let i = 0; i < data.length; i += 1) {
      if (isDaily === data[i].Status) {
        if (methodFilter === data[i].journeyType || methodFilter === 'None') {
          if (parseFloat(maxPriceFilter) >= data[i].cost || maxPriceFilter === 'None') {
            if (parseFloat(minRateFilter) <= data[i].creatorRating || minRateFilter === 'None') {
              if (isInDistance(origin, { latitude: data[i].startLat, longitude: data[i].startLong }, dest, { latitude: data[i].endLat, longitude: data[i].endLong }, parseFloat(distFilter)) || distFilter === 'None') {
                matchingJourneys.push(data[i]);
              }
            }
          }
        }
      }
    }
    if (matchingJourneys.length !== 0) {
      for (let i = 0; i < matchingJourneys.length; i += 1) {
        journeysFilterFinalTemp.push(
          <View key={matchingJourneys[i].journeyID + (i.toString())}>
            <AvailableJourneyCard data={matchingJourneys[i]} navigation={props.navigation} />
          </View>,
        );
      }
    } else {
      journeysFilterFinalTemp.push(
        <View style={styles.container}>
          <Text style={styles.titleText}>No Journeys</Text>
        </View>,
      );
    }
    setFinalList(journeysFilterFinalTemp);
  };

  const searchforDaily = async () => {
    setIsDaily('Daily');
    filterData();
  };
  const searchforPending = async () => {
    setIsDaily('Pending');
    filterData();
  };

  const initialData = async (msg) => {
    const matchingJourneys = [];
    const journeysFilterFinalTemp = [];
    for (let i = 0; i < msg.length; i += 1) {
      if (msg[i].Status === 'Daily' || msg[i].Status === 'Pending') {
        if (methodFilter === msg[i].journeyType || methodFilter === 'None') {
          if (parseFloat(maxPriceFilter) >= msg[i].cost || maxPriceFilter === 'None') {
            if (parseFloat(minRateFilter) <= msg[i].creatorRating || minRateFilter === 'None') {
              matchingJourneys.push(msg[i]);
            }
          }
        }
      }
    }
    if (matchingJourneys.length !== 0) {
      for (let i = 0; i < matchingJourneys.length; i += 1) {
        journeysFilterFinalTemp.push(
          <View key={matchingJourneys[i].journeyID + (i.toString())}>
            <AvailableJourneyCard data={matchingJourneys[i]} navigation={props.navigation} />
          </View>,
        );
      }
    } else {
      journeysFilterFinalTemp.push(
        <View style={styles.container}>
          <Text style={styles.titleText}>No Journeys</Text>
        </View>,
      );
    }
    setFinalList(journeysFilterFinalTemp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Available Journeys</Text>
      <View style={styles.dropdownsRow}>

        <SelectDropdown
          data={journeyTypeWithImage}
          defaultButtonText="Select method"
          buttonStyle={styles.dropdownBtnStyle_1}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          onSelect={(selectedItem) => {
            // displayFilter.method = selectedItem.title;
            setMethodFilter(selectedItem.title);
          }}
          rowStyle={styles.dropdownRowStyle_1}
          renderCustomizedButtonChild={(selectedItem) => (
            <View style={styles.dropdownBtnChildStyle_1}>
              <Text style={styles.dropdownBtnTxtStyle_1}>
                {selectedItem ? selectedItem.title : 'Method'}
              </Text>
              <FontAwesome name="chevron-down" color="#444" size={12} />
            </View>
          )}
          dropdownStyle={styles.dropdownDropdownStyle_1}
          renderCustomizedRowChild={(item) => (
            <View style={styles.dropdownRowChildStyle_1}>
              <Image source={item.image} style={styles.dropdownImageStyle_1} />
              <Text style={styles.dropdownRowTxtStyle_1}>{item.title}</Text>
            </View>
          )}
        />

        <SelectDropdown // Acceptable Distance
          data={distance}
          defaultButtonText="Dist." // Set allowed distance
          onSelect={(selectedItem) => {
            // console.log(selectedItem, index);
            setDistFilter(selectedItem);
            // displayFilter.maxPrice = selectedItem.title;
          }}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdownBtnStyle_2}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          renderDropdownIcon={(isOpened) => (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color="#444"
              size={12}
            />
          )}
          dropdownIconPosition="right"
          dropdownStyle={styles.dropdownDropdownStyle_2}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_2}
        />

        <SelectDropdown // Maximum price
          data={maxPrice}
          defaultButtonText="Price"
          onSelect={(selectedItem) => {
            setMaxPriceFilter(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdownBtnStyle_3}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          renderDropdownIcon={(isOpened) => (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color="#444"
              size={12}
            />
          )}
          dropdownIconPosition="right"
          dropdownStyle={styles.dropdownDropdownStyle_2}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_2}
        />

        <SelectDropdown // Min rate
          data={minRate}
          defaultButtonText="Rate"
          onSelect={(selectedItem) => {
            setMinRateFilter(selectedItem);
            // displayFilter.minRate = selectedItem.title;
          }}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdownBtnStyle_4}
          buttonTextStyle={styles.dropdownBtnTxtStyle_1}
          renderDropdownIcon={(isOpened) => (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color="#444"
              size={12}
            />
          )}
          dropdownIconPosition="right"
          dropdownStyle={styles.dropdownDropdownStyle_2}
          rowStyle={styles.dropdownRowStyle_1}
          rowTextStyle={styles.dropdownRowTxtStyle_3}
        />

      </View>
      <View style={styles.dropdownsRow}>
        <TouchableOpacity style={styles.dailyButt} onPress={searchforPending}>
          <Text style={styles.applyButtTxt}>One Off Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dailyButt} onPress={searchforDaily}>
          <Text style={styles.applyButtTxt}>Daily Trips</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.applyButt} onPress={filterData}>
        <Text style={styles.applyButtTxt}>Apply</Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.items}>
          {journeysFilterFinal}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
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
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
  },
  dropdownBtnStyle_1: {
    width: '25%',
    height: 40,
    backgroundColor: '#AAFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle_1: { fontSize: 13, color: '#555555', textAlign: 'left' }, // Dropdown
  dropdownDropdownStyle_1: { backgroundColor: '#EFEFEF', width: '40%' }, // Dropdwon width
  dropdownRowStyle_1: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#444',
    height: 50,
    width: '100%',
  },
  dropdownRowTxtStyle_1: {
    color: '#111111',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    left: 50,
  },
  dropdownImageStyle_1: {
    width: 45, height: 45, resizeMode: 'cover', position: 'absolute', left: 0,
  },
  dropdownBtnChildStyle_1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dropdownRowChildStyle_1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    width: '100%',
  },

  dropdownBtnStyle_2: {
    width: '25%',
    height: 40,
    backgroundColor: '#FFEEAA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownDropdownStyle_2: { backgroundColor: '#EFEFEF', width: '25%' }, // Dropdwon width
  dropdownRowTxtStyle_2: {
    color: '#111111',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

  dropdownBtnStyle_3: {
    width: '25%',
    height: 40,
    backgroundColor: '#99FF99',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownRowTxtStyle_3: {
    color: '#111111',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  // try

  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {

  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    width: '2%',
  },
  dropdownRowImage: {
    width: 45, height: 45, resizeMode: 'cover', position: 'absolute', left: 0,
  },
  dropdown3RowTxt: {
    color: '#111111',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    left: 50,
  },
  applyButt: {
    width: '90%',
    backgroundColor: '#33FF99',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 5,
    // marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  dailyButt: {
    width: '40%',
    maxHeight: 50,
    backgroundColor: 'cyan',
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
    marginRight: '20%',
  },
  applyButtTxt: {
    color: '#111111',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdownBtnStyle_4: {
    width: '25%',
    height: 40,
    backgroundColor: '#FFAAAA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
});

export default Journeys;
