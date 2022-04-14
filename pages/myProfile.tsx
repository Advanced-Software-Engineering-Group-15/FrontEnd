import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native';

const img = require('../assets/blank-profile-picture.png');

const MyProfile = (props: any) => {
    const userProps = props.navigation.state.params.userProps;
    const username = userProps.username;
    const data = props.navigation.state.params.data;
    const passengerData = props.navigation.state.params.passengerData;
    const creatorData = props.navigation.state.params.creatorData;
    const isCreator = props.navigation.state.params.isCreator;
    const viewJourneysPage = () => {
        props.navigation.navigate('ViewJourneys', {passengerData: passengerData,data : data, userProps: userProps});
      }
    
      const viewCreatedJourneysPage = () => {
        props.navigation.navigate('ViewCreatedJourneys', {creatorData: creatorData, data : data, userProps: userProps});
      }
    return (
        <View style={styles.container}>
           <View style={styles.TopContainer}>
               <Image style={styles.Image}
               source={require('../assets/blank-profile-picture.png')}
               />
               <View style={styles.containerCentre}>
                   <Text style={styles.Number}>{username}</Text>
               </View>
               { isCreator &&
               <View style={styles.containerCentre}>
                   <Text style={styles.Number}>{creatorData.length}</Text>
                   <Text style={styles.HeadingName}>Trips Created</Text>
               </View>
                }
               <View style={styles.containerCentre}>
                   <Text style={styles.Number}>{passengerData.length}</Text>
                   <Text style={styles.HeadingName}>Trips Joined</Text>
               </View>
               
           </View>
           <View style={styles.containerCentre}>
                <TouchableOpacity style={styles.ViewJourneyBtn} onPress={viewJourneysPage}>
                    <Text style={styles.homePageBtnText} >Journeys</Text>
                </TouchableOpacity>
                { isCreator &&
                <TouchableOpacity style={styles.ViewJourneyBtn} onPress={viewCreatedJourneysPage}>
                    <Text style={styles.homePageBtnText} >Created Journeys</Text>
                </TouchableOpacity>
                }
            </View>
        </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        padding:10,
    },
    containerCentre: {
        backgroundColor: 'white',
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        justifyContent: 'center',
    },
    Image: {
        height: 60,
        width: 60,
        backgroundColor: 'grey',
        borderRadius: 50,
    },
    Number: {
        fontWeight: '400',
        fontSize: 20,
        color: 'blue',
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    HeadingName: {
        fontSize: 20,
        color: 'grey',
        paddingHorizontal:10,
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
      homePageBtnText: {
        color: '#000000',
        fontSize: 18,
        height: 30,
      },
})
