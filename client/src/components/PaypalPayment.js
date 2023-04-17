import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import allUrls from "../config/config";
import { useCartContext } from "../context/cart_context";

export default function PaypalPayment() {
  const { cart: cartItems } = useCartContext();
  
  let price = 0;
  cartItems.forEach((item) => {
    price += item.price/100 * item.amount;
  });
  // console.log(price, "price");
  const createOrder = async (data) => {
    // Order is created on the server and the order id is returned
    const url = `${allUrls.backend_url}/api/v1/create-paypal-order`;
    // console.log(url, 'url')
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product skus and quantities
        body: JSON.stringify({
          product: {
            cartItems,
            cost : price
          },
          // cart: [
          //   {
          //     sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
          //     quantity: "YOUR_PRODUCT_QUANTITY",
          //   },
          // ],
        }),
      });

      const order = await response.json();
      return order.id;
    } catch (err) {
      console.log("err is ", err);
    }
  };

  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser
    console.log(data, "data onapprove");
    return fetch(`${allUrls.backend_url}/api/v1/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => {
      console.log("PayPal payment approved", response);
      response.json();
    });
  };
  return (
    <PayPalButtons
      createOrder={async (data, actions) => {
        // console.log(data, "value");
        return await createOrder(data, actions);
      }}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}
