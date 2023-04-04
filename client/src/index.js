import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import store from "./store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <Provider store={store}>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
  </Provider>
);
