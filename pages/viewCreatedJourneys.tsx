// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import
{
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
}
  from 'react-native';
import PassengerJourneysCard from '../components/PassengerJourneysCard.tsx';

const ViewCreatedJourneys = (props: any) => {
  const [journeysFilterFinal, setFinalList] = useState([]);
  const creatorData = props.navigation.state.params.creatorData;
  const data = props.navigation.state.params.data;

  useEffect(() => {
    matchJourneys();
  }, []);

  const matchJourneys = async () => {
    const matchingJourneys = [];
    const journeysFilterFinalTemp = [];
    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < creatorData.length; j += 1) {
        if (creatorData[j].journeyID === data[i].journeyID) {
          matchingJourneys.push(data[i]);
        }
      }
    }
    if (matchingJourneys.length !== 0) {
      for (let i = 0; i < matchingJourneys.length; i += 1) {
        journeysFilterFinalTemp.push(
          <View key={matchingJourneys[i].journeyID}>
            <PassengerJourneysCard data={matchingJourneys[i]} navigation={props.navigation} />
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

  const RatingPage = () => {
    props.navigation.navigate('Ratings');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.items}>
          {journeysFilterFinal}
        </View>
        <TouchableOpacity style={styles.ViewJourneyBtn}>
          <Text style={styles.homePageBtnText} onPress={RatingPage}>Rating Page</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    height: 200,
    color: 'white',
    fontSize: 25,
  },
  homePageBtnText: {
    color: '#000000',
    fontSize: 18,
    height: 30,
  },
  ViewJourneyBtn: {
    width: '40%',
    backgroundColor: '#33FF99',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  items: {
    flex: 1,
    // padding: 10,
    // marginHorizontal: 12,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingVertical: 5,
    color: '#27ae60',
  },
});

export default ViewCreatedJourneys;
