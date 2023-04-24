import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./Payment.css";
import { useCartContext } from "../context/cart_context";
import PaypalPayment from "./PaypalPayment";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { cart: cartItems } = useCartContext();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  //paypal
  const initialOptions = {
    "client-id": "Aave2RH0c-nptoRV1FLUVf8UuLC_XNHC0G6IFEX7NK4aaW3A6Cdwc9nVe9o7oQNvhhq7wurfTbJGG4DM",
    currency: "USD",
    intent: "capture",
  };

  const order = {
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="paymentContainer">
        <PaypalPayment order={order}/>
      </div>
    </PayPalScriptProvider>
  );
};

export default Payment;
