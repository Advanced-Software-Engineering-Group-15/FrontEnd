// Payment.
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
//Styling in future 
//import './App.css';

//import AvailableJourneyCard from '../components/AvailableJourneyCard';
import StripeCheckoutButton from '../components/stripe-button/stripe.button.component';

function Payment() {

<<<<<<< HEAD
<<<<<<< HEAD
const stripePromise = loadStripe('pk_test_51KP6MgG8vk1CJkKgWm5D962cWUXuxyFWpSJDDpFpDLjKmcAObx9kWrxrhX8DVc36ZwEBJdndG3EGX6bLHTsDd8vc00CvpXY7pQ');

const App = () => {
  const stripe = loadStripe(
    "pk_test_51KP6MgG8vk1CJkKgWm5D962cWUXuxyFWpSJDDpFpDLjKmcAObx9kWrxrhX8DVc36ZwEBJdndG3EGX6bLHTsDd8vc00CvpXY7pQ"
  );
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;

function CheckoutForm() {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  
  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = getClientSecret();
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Faruq Yusuff",
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Success!");
      }
    }
  };
=======
  const totalPrice = 58;
>>>>>>> 7ca5035 (Adding Payment button)
=======
  const totalPrice = 100;
>>>>>>> 594cb30 (Payment branch, updating button)

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