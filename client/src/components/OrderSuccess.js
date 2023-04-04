import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";

const OrderSuccess = () => {
  const { clearCart } = useCartContext();
  useEffect(() => {
    clearCart();
  });

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
