import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import allUrls from "../config/allUrls";

export default function PaypalPayment() {
    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch(`${allUrls.backend_url}/create-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({
            product:{
              discription: "YOUR_ORDER_DESCRIPTION",
              cost: "YOUR_ORDER_COST",
            }
            // cart: [
            //   {
            //     sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            //     quantity: "YOUR_PRODUCT_QUANTITY",
            //   },
            // ],
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      };
      const onApprove = (data) => {
         // Order is captured on the server and the response is returned to the browser
         return fetch(`${allUrls.backend_url}/capture-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        })
        .then((response) => {
          console.log("PayPal payment approved", response.json());
          response.json()});
      };
    return (
        <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
  )
}
