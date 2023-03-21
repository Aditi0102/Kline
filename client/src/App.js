import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/UserOptions";
import { useSelector } from "react-redux";
// import ProtectedRoute from './components/ProtectedRoute'
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ConfirmOrder from "./components/ConfirmOrder";
import Payment from "./components/Payment";
import axios from "axios";

import {
  Home,
  SingleProductPage,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  TermsAndConditions,
  LoginSignUp,
  Profile,
  Shipping,
} from "./pages";
// import { Switch } from '@material-ui/core'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeapikey, setStripeapikey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapi");
    setStripeapikey(data.stripeapikey);
  }
  // console.log(user,"app vala");
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:productid" element={<SingleProductPage />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder/>} />
          <Route path ="/process/payment" element={<Payment/>} />
          

          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="error" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
