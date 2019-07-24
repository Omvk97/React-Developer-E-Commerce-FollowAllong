import React from "react";
import StripeCheckout from "react-stripe-checkout";

function StripeButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_KMiBgaiHGoTDEYwYNEKpesvd00vmvYkEtq";

  function onToken(token) {
    console.log(token);
    alert("Payment Successfull");
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
