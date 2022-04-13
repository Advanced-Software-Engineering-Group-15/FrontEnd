import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

const AvailableJourneyCard = (props: any) => {
  const userProps = props.navigation.state.params.userProps;

  const openInMap = () => {
    props.navigation.navigate('Map', {
        journeyID: props.data.journeyID,
        creatorID: props.data.creatorID,
        start: {name: props.data.startName,
                latitude: props.data.startLat,
                longitude: props.data.startLong}
                , 
        end: {name: props.data.endName,
            latitude: props.data.endLat,
            longitude: props.data.endLong,},
        dateTime: props.data.departure_datetime,
        capacity: props.data.capacity,
        userProps,
      })
  }  
    
  return (
      <TouchableOpacity onPress={openInMap}>
          <View style={styles.items}>
              <Text style={styles.cardDepatureTxtStyle}>
                  Departure: {'\n         '}
                  {JSON.stringify(props.data.startName).split("\"")[1].split(",")[0]}
              </Text>
              <Text style={styles.cardDestinationTxtStyle}>
                  Destination: {'\n         '}{JSON.stringify(props.data.endName).split("\"")[1].split(",")[0]}
              </Text>
              <Text style={styles.cardUserTxtStyle}>
                  {props.data.creatorID}{"  "}
                  <Ionicons name="star" style={styles.cardUserTxtStyle}/>  
                  {"  "}{props.data.creatorRating}
              </Text>
              <Text style={styles.cardTypeTxtStyle}>
                  {JSON.stringify(props.data.journeyType).split("\"")[1]}
              </Text>
              <Text style={styles.cardCapacityStyle}>
                  MAX: {JSON.stringify(props.data.capacity)}
              </Text>  
              <Text style={styles.cardPriceTxtStyle}>
                  Price: {JSON.stringify(props.data.cost)}
              </Text>       
              <Text style={styles.cardDateTxtStyle}>
                  {JSON.stringify(props.data.departure_datetime).split("T")[0].split("\"")[1]}
                  {'\n'}
              </Text>    
              <Text style={styles.cardTimeTxtStyle}>
                  {JSON.stringify(props.data.departure_datetime).split("\:")[0].split("T")[1]}
                  {" : ".concat(JSON.stringify(props.data.departure_datetime).split("\:")[1])}
              </Text>
              { 
                  JSON.stringify(props.data.Status).split("\"")[1] == "Started"
                  && <Text style={styles.cardStatusRedTxtStyle}>
                      In Progress
                  </Text>
              }
              { 
                  JSON.stringify(props.data.Status).split("\"")[1] == "Ended"
                  && <Text style={styles.cardStatusRedTxtStyle}>
                      Finished
                  </Text>
              }
              { 
                  JSON.stringify(props.data.Status).split("\"")[1] == "Cancelled"
                  && <Text style={styles.cardStatusPurpleTxtStyle}>
                      Cancelled
                  </Text>
              }
              {
                JSON.stringify(props.data.Status).split("\"")[1] == null
                && <Text style={styles.cardStatusGreenTxtStyle}>
                    Recruiting
                </Text>
              }
          </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  items: {
    marginBottom: 3,
    padding: 10,
    borderWidth: 3,
    borderColor: '#27ae60',
    borderRadius: 25,
    height: 200,
    width: '100%',
  },

  cardDepatureTxtStyle: {
    fontSize: 17,
    position: 'absolute',
    top: 5,
    left: 10,
    fontWeight: 'bold',
    color: '#22AA22',
  },
  cardDestinationTxtStyle: {
    fontSize: 17,
    position: 'absolute',
    top: 42,
    left: 10,
    fontWeight: 'bold',
    color: '#FF2222',
  },
  cardTypeTxtStyle: {
    fontSize: 20,
    position: 'absolute',
    bottom: 27,
    right: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardCapacityStyle: {
    fontSize: 20,
    position: 'absolute',
    top: 5,
    right: 10,
    fontWeight: 'bold',
    color: '#FFA5FF',
  },
  cardPriceTxtStyle: {
    fontSize: 20,
    position: 'absolute',
    bottom: 5,
    right: 10,
    fontWeight: 'bold',
    color: '#FFA500',
  },

  cardUserTxtStyle: {
    marginTop: '23%',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2222FF',
  },
  cardDateTxtStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 23,
    color: '#20201e',
  },
  cardTimeTxtStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 5,
    left: 40,
    color: '#555555',
  },
  cardStatusRedTxtStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 50,
    right: 10,
    color: '#FF5555',
  },
  cardStatusGreenTxtStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 50,
    right: 10,
    color: '#22AA22',
  },
  cardStatusPurpleTxtStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 50,
    right: 10,
    color: '#BF40BF',
  },
});

export default AvailableJourneyCard;
