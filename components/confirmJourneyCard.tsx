import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity} from 'react-native';

const confirmJourneyCard = (props: any) => {
    const inputProps = props.navigation.state.params;
    console.log(JSON.stringify(props.data, null, 2))

    const returnHome = () => {
        props.navigation.navigate("Home")
    }
      
    return (
        <TouchableOpacity onPress={returnHome}>
            <View style={styles.items}>
                <Text>Departure: {JSON.stringify(inputProps.origin_info.description)}</Text>
                <Text>Destination: {JSON.stringify(inputProps.destination_info.description)}</Text>
                <Text>Journey type: {JSON.stringify(inputProps.journey.journeyType)}</Text>
                {/* <Text>Pricing ({JSON.stringify(props.data.pricing.currency)}): {JSON.stringify(props.data.pricing.quantity)}</Text> */}
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

export default confirmJourneyCard;