import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/HomePage.component";
import ShopPage from "./pages/shoppage/ShopPage.component";
import SigninPage from "./pages/signinpage/SignInPage.component";
import CheckoutPage from "./pages/checkoutpage/CheckoutPage.component";

import Header from "./components/header/Header.component";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

function App({ currentUser, checkUserSession }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SigninPage />)}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
