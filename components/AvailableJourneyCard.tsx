import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity} from 'react-native';

const AvailableJourneyCard = (props: any) => {
    console.log(JSON.stringify(props.data, null, 2))

    const openInMap = () => {
        props.navigation.navigate("Map",  { 
            start: props.data["journeyStart"], 
            end: props.data["journeyEnd"] })
      }
      
    return (
        <TouchableOpacity onPress={openInMap}>
            <View style={styles.items}>
                <Text>Journey ID: {JSON.stringify(props.data.journeyID)}</Text>
                <Text>Departure: {JSON.stringify(props.data.journeyStart.name)}</Text>
                <Text>Destination: {JSON.stringify(props.data.journeyEnd.name)}</Text>
                <Text>Journey type: {JSON.stringify(props.data.journeyType)}</Text>
                <Text>Pricing ({JSON.stringify(props.data.pricing.currency)}): {JSON.stringify(props.data.pricing.quantity)}</Text>
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