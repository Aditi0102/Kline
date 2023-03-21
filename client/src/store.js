// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit"
import { userReducer, profileReducer, forgotPasswordReducer } from "./reducers/userReducer";
import  cart_reducer  from "./reducers/cart_reducer";


// const reducer = combineReducers({
//     user: userReducer,
// });

// let initialState = {
//   cart:{
//     cartItems: localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart"))
//       : [],
//   }
// };

// const middleware = [thunk];

const store = configureStore({
  reducer : {
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cart_reducer,
  }
}
  // reducer,
  // initialState,
  // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
