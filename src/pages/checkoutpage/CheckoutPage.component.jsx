import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./CheckoutPage.styles.scss";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout_item/CheckoutItem.component";
import StripeButton from "../../components/stripe_button/StripeButton.component";

function Checkout({ cartItems, total }) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product </span>
        </div>
        <div className="header-block">
          <span>Description </span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <div className="total">TOTAL: ${total}</div>
      <div className="test-warning">
        ***PLEASE USE THE FOLLOWING TEST CREDIT CARD FOR PAYMENTS***
        <br />
        4242 4242 4242 4242 - 01/20 - CVV: 123
      </div>
      <StripeButton price={total} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(Checkout);
