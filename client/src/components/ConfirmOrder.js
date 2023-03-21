import React, { Fragment } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cart_context";

const ConfirmOrder = () => {
  const { shippingInfo, cart: cart_Items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { total_amount, shipping_fee } = useCartContext();

  // console.log(shippingInfo, "shippingInfo");
  // console.log(cartItems, "cartItems");
  // console.log(user, "user");
  // console.log(isAuthenticated, "user auth");

  const cartItems = cart_Items.cartItems;
  const navigate = useNavigate();
  console.log(cartItems, "cartItems");
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.amount * item.price) / 100,
    0
  );

  // const shippingCharges = subtotal > 1000 ? 0 : 200;
  const shippingCharges = shipping_fee / 100;

  // const tax = subtotal * 0.18;
  const tax = (total_amount / 100) * 0.18;

  // const totalPrice = subtotal + tax + shippingCharges;
  const totalPrice = total_amount / 100 + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  function string_between_strings(startStr, endStr, str) {
    let pos = str?.indexOf(startStr) + startStr?.length;
    return str?.substring(pos, str.indexOf(endStr, pos));
  }

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      {/* <MetaData title="Confirm Order" /> */}
      {/* <CheckoutSteps activeStep={1} /> */}
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img
                      src={`https://drive.google.com/uc?export=view&id=${string_between_strings(
                        "/d/",
                        "/view?",
                        item.image
                      )}`}
                      alt="Product"
                    />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                    <span>
                      {item.amount} X ₹{item.price / 100} ={" "}
                      <b>${(item.price / 100) * item.amount}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${total_amount / 100}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
