import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet,  TouchableOpacity} from 'react-native';

const AvailableJourneyCard = (props: any) => {
    
    // console.log(JSON.stringify(props.data, null, 2))
    const userProps = props.navigation.state.params.userProps
    // console.log('Journey Card PROPSSS:', props)

    const openInMap = () => {

        var currTime = new Date()
        props.navigation.navigate("Map",  {
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
                    Departure: {JSON.stringify(props.data.startName).split("\"")[1].split(",")[0]}
                </Text>
                <Text style={styles.cardDestinationTxtStyle}>
                    Destination: {JSON.stringify(props.data.endName).split("\"")[1].split(",")[0]}
                </Text>
                <Text style={styles.cardUserTxtStyle}>
                    {props.data.creatorID}{"  "}
                    <Ionicons name="star" style={styles.cardUserTxtStyle}/>  
                    {props.data.creatorRating}
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
                <Text style={styles.cardTimeTxtStyle}>
                    {JSON.stringify(props.data.departure_datetime).split("\:")[0].split("T")[1]}
                    {" : ".concat(JSON.stringify(props.data.departure_datetime).split("\:")[1])}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    items: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 3,
        borderColor: "#27ae60",
        borderRadius: 25,
        height: 180,
        width: 380,
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
        position: 'absolute',
        bottom: 30, right: 20,
        fontWeight: "bold",
        color: '#333333',
    },
    cardCapacityStyle: {
        fontSize: 17,
        position: 'absolute',
        top: 20, right: 20,
        fontWeight: "bold",
        color: '#FFA5FF',
    },
    cardPriceTxtStyle:{
        fontSize: 20,
        position: 'absolute',
        bottom: 5, right: 20,
        fontWeight: "bold",
        color: '#FFA500',
    },

    cardUserTxtStyle: {
        marginTop: 15,
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: '#2222FF',
    },
    cardDateTxtStyle: {
        fontSize: 17,
        fontWeight: "bold",
        position: 'absolute',
        bottom: 10, left: 23,
        color: '#20201e',
    },
    cardTimeTxtStyle: {
        fontSize: 17,
        fontWeight: "bold",
        position: 'absolute',
        bottom: 5, left: 23,
        color: '#3b3b37',
    },
    cardStatusTxtStyle: {
        fontSize: 17,
        fontWeight: "bold",
        position: 'absolute',
        bottom: 5, left: 23,
        color: '#FF0000',
    },
    
})

export default AvailableJourneyCard;