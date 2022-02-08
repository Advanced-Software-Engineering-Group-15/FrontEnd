// stripe.button.component.tsx
//    STRIPE PUBLISHABLE KEY available on Stripe Dashboard
//    pk_test_51KP6MgG8vk1CJkKgWm5D962cWUXuxyFWpSJDDpFpDLjKmcAObx9kWrxrhX8DVc36ZwEBJdndG3EGX6bLHTsDd8vc00CvpXY7pQ 

import React from 'react';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KP6MgG8vk1CJkKgWm5D962cWUXuxyFWpSJDDpFpDLjKmcAObx9kWrxrhX8DVc36ZwEBJdndG3EGX6bLHTsDd8vc00CvpXY7pQ';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Carma Corp'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;

