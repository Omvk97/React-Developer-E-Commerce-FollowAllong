import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function StripeButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_KMiBgaiHGoTDEYwYNEKpesvd00vmvYkEtq";

  function onToken(token) {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert("Payment successful");
      })
      .catch(error => {
        console.log("Payment error ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card"
        );
      });
  }
  return (
    <StripeCheckout
      label="Betal Nu"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Den totale sum er $${price}`}
      amount={priceForStripe}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeButton;
