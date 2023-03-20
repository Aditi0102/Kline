import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit"
import { userReducer, profileReducer, forgotPasswordReducer } from "./reducers/userReducer";

// const reducer = combineReducers({
//     user: userReducer,
// });

let initialState = {
  cart:{
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],

  }
};

const middleware = [thunk];

const store = configureStore({
  reducer : {
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
  }
}
  // reducer,
  // initialState,
  // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
