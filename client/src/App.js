import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ConfirmOrder from "./components/ConfirmOrder";


import {
  Home,
  SingleProductPage,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  TermsAndConditions,
  LoginSignUp,
  Profile,
  Shipping,
  MyOrders,
} from "./pages";
import ElementProvider from "./components/ElementProvider";
import OrderSuccess from "./components/OrderSuccess";
import { useProductsContext } from './context/products_context';

function App() {
 
  const { isSidebarOpen } = useProductsContext();
  return (
      <Router>
        {!isSidebarOpen && <Navbar setopenNavbar/>}
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:productid" element={<SingleProductPage />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder/>} />
          <Route path ="/process/payment" element={<ElementProvider/>} />
          <Route path ="/success" element={<OrderSuccess/>} />
          <Route path ="/orders" element={<MyOrders/>} />

          <Route
            path="checkout"
            element={
              
                <Checkout />
    
            }
          />
          <Route path="error" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
