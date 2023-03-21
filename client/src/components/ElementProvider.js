import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import allUrls from "../config/config";
import axios from "axios";
import store from "../store";
import { loadUser } from "../actions/userAction";
import Payment from "./Payment";
import { useSelector } from "react-redux";

export default function ElementProvider() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const {user, isAuthenticated} = useSelector((state) => state.user);
  const {shippingInfo} = useSelector((state) => state.cart);
  console.log(shippingInfo, "shipping_info");
  async function getStripeApiKey() {
    const config = {
      headers: { Authorization: `${localStorage.getItem('token')}` }
  };
    if(isAuthenticated){
        const { data : stripeapikey } = await axios.get(
          `${allUrls.backend_url}/api/v1/stripeapikey`
          ,config
        );
        setStripeApiKey(stripeapikey.stripeApiKey);
    }else{
        //yha error de dena
    }
  }
  useEffect(() => {
    // store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  );
}
