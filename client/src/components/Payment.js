import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder } from "../actions/orderAction";
import allUrls from "../config/config";
import { useCartContext } from "../context/cart_context";
import PaypalPayment from "./PaypalPayment";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { cart: cartItems } = useCartContext();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  //paypal
  const initialOptions = {
    "client-id": "Aave2RH0c-nptoRV1FLUVf8UuLC_XNHC0G6IFEX7NK4aaW3A6Cdwc9nVe9o7oQNvhhq7wurfTbJGG4DM",
    currency: "USD",
    intent: "capture",
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shippingInfo: shippingInfo,
    user: user,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };

      const { data } = await axios.post(
        `${allUrls.backend_url}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          console.log("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    // if (error) {
    //   dispatch(clearErrors());
    // }
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="paymentContainer">
        <PaypalPayment/>
      </div>
    </PayPalScriptProvider>
  );
};

export default Payment;
