// Payment.
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
//Styling in future 
//import './App.css';

//import AvailableJourneyCard from '../components/AvailableJourneyCard';
import StripeCheckoutButton from '../components/stripe-button/stripe.button.component';

function Payment() {

  const totalPrice = 100;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Make Stripe Payment @ Carma</h1>
        <p>
          Pay Total of $ {totalPrice}
        </p>
        <p>
          <StripeCheckoutButton price={totalPrice} />
        </p>
      </header>
    </div>
  );
}

export default Payment;