// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useStripe, useElements } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

//    STRIPE PUBLISHABLE KEY available on Stripe Dashboard
//    pk_test_51KP6MgG8vk1CJkKgWm5D962cWUXuxyFWpSJDDpFpDLjKmcAObx9kWrxrhX8DVc36ZwEBJdndG3EGX6bLHTsDd8vc00CvpXY7pQ 

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

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit = {payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white"
                  } 
                },
              }}
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}