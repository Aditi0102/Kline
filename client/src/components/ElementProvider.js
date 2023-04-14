import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import allUrls from "../config/config";
import axios from "axios";
import Payment from "./Payment";
import { useSelector } from "react-redux";

export default function ElementProvider() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const {isAuthenticated} = useSelector((state) => state.user);

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
  });

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  );
}
