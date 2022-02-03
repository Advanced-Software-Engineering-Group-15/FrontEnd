import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const AvailableJourneyCard = (props: any) => {
    console.log(JSON.stringify(props.data))
    return (
        <View style={styles.items}>
            <Text>Journey ID: {JSON.stringify(props.data["journeyID"])}</Text>
            <Text>Departure: {JSON.stringify(props.data["journeyStart"])}</Text>
            <Text>Destination: {JSON.stringify(props.data["journeyEnd"])}</Text>
            <Text>Journey type: {JSON.stringify(props.data["journeyType"])}</Text>
            <Text>Pricing ({JSON.stringify(props.data["pricing"][0]['currency'])}): {JSON.stringify(props.data["pricing"][0]['quantity'])}</Text>
            <Text>Creator ID: {JSON.stringify(props.data["creatorID"])}</Text>
            <Text>Creator Rating: {JSON.stringify(props.data["creatorRating"])}</Text>
        </View>
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