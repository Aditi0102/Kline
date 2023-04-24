import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import allUrls from "../config/config";
import { useCartContext } from "../context/cart_context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../actions/orderAction";
import "./PaypalPayment.css";

export default function PaypalPayment(order) {
  const { cart: cartItems } = useCartContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let price = 0;
  cartItems.forEach((item) => {
    price += (item.price / 100) * item.amount;
  });
  console.log(cartItems, "cartItems");
  const newCartItems = cartItems.map((item) => {
    console.log((item.price/100).toFixed(2));
    return {
      unit_amount: {
        value: String((item.price / 100).toFixed(2)),
        currency_code: "USD",
      },
      quantity: String(item.amount),
      name: item.name,
    };
  });
  console.log(newCartItems, "newCartItems");
  const createPaypalOrder = async (data) => {
    // Order is created on the server and the order id is returned
    const url = `${allUrls.backend_url}/api/v1/create-paypal-order`;
    // console.log(data, 'url')
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
            cartItems: newCartItems,
            cost: price,
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
      // console.log(order, "create order")
      return order.id;
    } catch (err) {
      console.log("err is ", err);
    }
  };

  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    // console.log(data, "data onapprove");
    return fetch(`${allUrls.backend_url}/api/v1/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => {
      // console.log("PayPal payment approved", response);
      response.json();
      dispatch(createOrder(order));
      navigate("/success");
    });
  };
  return (
    <div className="paypal-button">
      <PayPalButtons
        createOrder={async (data, actions) => {
          return await createPaypalOrder(data, actions);
        }}
        onApprove={async (data, actions) => await onApprove(data, actions)}
      />
    </div>
  );
}

const data = {
  purchase_units: [
    {
      reference_id: "Kline Decor Store",
      description: "Mobile World Store order-1234",
      amount: {
        currency: "USD",
        details: { subtotal: "price", shipping: "0", tax: "0" },
        total: "price",
      },
      payee: { email: "seller@example.com" },
      items: [
        {
          name: "NeoPhone",
          sku: "sku03",
          price: "0.54",
          currency: "USD",
          quantity: "1",
        },
        {
          name: "Fitness Watch",
          sku: "sku04",
          price: "0.55",
          currency: "USD",
          quantity: "1",
        },
      ],
      shipping_address: {
        line1: "2211 N First Street",
        line2: "Building 17",
        city: "San Jose",
        country_code: "US",
        postal_code: "95131",
        state: "CA",
        phone: "(123) 456-7890",
      },
      shipping_method: "United Postal Service",
      partner_fee_details: {
        receiver: { email: "partner@example.com" },
        amount: { value: "0.01", currency: "USD" },
      },
      payment_linked_group: 1,
      custom: "custom_value_2388",
      invoice_number: "invoice_number_2388",
      payment_descriptor: "Payment Mobile World",
    },
  ],
  redirect_urls: {
    return_url: "https://example.com/return",
    cancel_url: "https://example.com/cancel",
  },
};
