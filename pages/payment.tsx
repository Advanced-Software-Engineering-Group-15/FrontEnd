// Payment.
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import StripeCheckout from 'react-stripe-checkout';
//Styling in future 
//import './App.css';

//npm install react-stripe-checkout
//npm install react-stripe

import StripeCheckoutButton from '../components/stripe-button/stripe.button.component';

const Payment = (props: any) => {

  const totalPrice = 100;

  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Make Stripe Payment @ Carma</Text>
        <Text style={styles.logo}>Pay Total of $ {totalPrice}</Text>
        <TouchableOpacity style={styles.loginBtn}>
          <StripeCheckoutButton price={totalPrice} />
        </TouchableOpacity>
    </View>
  );
}

//styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"70%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"35%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

export default Payment;