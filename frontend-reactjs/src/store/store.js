import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import wishlistReducer from "./wishlistSlice";
import reviewReducer from "./reviewSlice";
import userReducer from "./userSlice";
import sellerReducer from "./sellerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    review: reviewReducer,
    user: userReducer,
    seller: sellerReducer,
  },
});

export default store;
