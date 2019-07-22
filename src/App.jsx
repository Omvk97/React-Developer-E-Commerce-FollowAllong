import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/HomePage.component";
import ShopPage from "./pages/shoppage/ShopPage.component";
import Signin from "./pages/signinpage/SignInPage.component";
import Header from "./components/header/Header.component";

function App() {
  return ( 
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
