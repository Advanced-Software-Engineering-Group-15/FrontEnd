// Payment.
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
//Styling in future 
//import './App.css';

import StripeCheckoutButton from '../components/stripe-button/stripe.button.component';

const Payment = (props: any) => {

  const totalPrice = 58;

  return (
    <View style= {styles.container}>
      <Text style= {styles.container}>Make Stripe Payment @ Freaky Jolly</Text>
      <Text style= {styles.container}>Pay Total of $ {totalPrice}</Text>
      <StripeCheckoutButton price={totalPrice} />
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
});
export default Payment;