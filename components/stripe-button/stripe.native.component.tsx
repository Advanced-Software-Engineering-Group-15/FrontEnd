import { StripeProvider, CardField } from '@stripe/stripe-react-native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button } from 'react-native';
const StripeCheckoutButton = ( props: any ) => {
  const priceForStripe = props.price * 100;
  const publishableKey = 'pk_test_51KP6MgG8vk1CJkKgWm5D962cWUXuxyFWpSJDDpFpDLjKmcAObx9kWrxrhX8DVc36ZwEBJdndG3EGX6bLHTsDd8vc00CvpXY7pQ';
  const handlePayPress = async () => {
    const response
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
      <CardField 
      style={styles.cardField}
      cardStyle={{
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8
      }}
      />
      <Button title="Pay" onPress={handlePayPress}/>
    </StripeProvider>
  );

}

const styles = StyleSheet.create({
cardField:{
  width: '100%',
  height: 50,
  marginVertical: 30,
},

})