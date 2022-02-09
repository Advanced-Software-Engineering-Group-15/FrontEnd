// Payment.
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { StripeProvider, CardField } from '@stripe/stripe-react-native';
//Styling in future 
//import './App.css';

//import StripeCheckoutButton from '../components/stripe-button/stripe.button.component';

const Payment = (props: any) => {

  const totalPrice = 58;

  return (
    <View style= {styles.container}>
      <Text style= {styles.welcomeText}>Stripe Payment of ${totalPrice}</Text>
      {/* <StripeCheckoutButton price={totalPrice} /> */}
      <CardField 
      style={styles.cardField}
      cardStyle={{
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8
      }}
      />
    </View>
    
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    height: 200,
    color: "white",
    fontSize: 25
  },
  cardField:{
    width: '100%',
    height: 50,
    marginVertical: 30,
    justifyContent: 'center',
    //flex: 1,
  },
});
export default Payment;