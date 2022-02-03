// Payment.
import React from 'react';
//Styling in future 
//import './App.css';

import StripeCheckoutButton from '../components/stripe-button/stripe.button.component';

const Payment = (props: any) => {

  const totalPrice = 58;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Make Stripe Payment @ Freaky Jolly</h1>
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