import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity} from 'react-native';

const AvailableJourneyCard = (props: any) => {
    console.log(JSON.stringify(props.data, null, 2))

    const openInMap = () => {
        props.navigation.navigate("Map",  {
            journeyID: props.data.journeyID, 
            start: {name: props.data.startName,
                    latitude: props.data.startLat,
                    longitude: props.data.startLong}
                    , 
            end: {name: props.data.endName,
                latitude: props.data.endLat,
                longitude: props.data.endLong,}}
               )
      }
    
      
    return (
        <TouchableOpacity onPress={openInMap}>
            <View style={styles.items}>
                <Text>Journey ID: {JSON.stringify(props.data.journeyID)}</Text>
                <Text>Departure: {JSON.stringify(props.data.startName)}</Text>
                <Text>Destination: {JSON.stringify(props.data.endName)}</Text>
                <Text>Journey type: {JSON.stringify(props.data.journeyType)}</Text>
                <Text>Pricing ({JSON.stringify(props.data.currency)}): {JSON.stringify(props.data.cost)}</Text>
                <Text>Creator Username: {JSON.stringify(props.data.creatorID)}</Text>
                <Text>Creator Rating: {JSON.stringify(props.data.creatorRating)}</Text> 
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    items: {
        padding: 20,
        borderWidth: 1,
        borderColor: "#27ae60",
        borderRadius: 50,
    }
})

export default AvailableJourneyCard;