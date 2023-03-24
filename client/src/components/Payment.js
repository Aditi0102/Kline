import React, {  useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../actions/orderAction";
import allUrls from "../config/config";


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cart: cart_Items } = useSelector((state) => state.cart);
  const { isAuthenticated ,  user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const payBtn = useRef(null);
  const navigate = useNavigate();


 
  const cartItems = cart_Items.cartItems;
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shippingInfo : shippingInfo,
    user : user
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
          Authorization: `${localStorage.getItem('token')}`,
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

        console.log(result.error.message);
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
    // if (error) {
    //   dispatch(clearErrors());
    // }
  }, [dispatch]);

  return (
    
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    
  );
};

export default Payment;
