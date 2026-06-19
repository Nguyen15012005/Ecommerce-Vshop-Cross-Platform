import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getAuth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
});

// ─── Fallback ──────────────────────────────────────────────────────────────────
const FALLBACK_CART = {
  cartItems: [],
  totalPrice: 0,
  totalItem: 0,
  totalDiscountedPrice: 0,
  discount: 0,
};

// ─── Thunks ────────────────────────────────────────────────────────────────────

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải giỏ hàng.");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, size, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/add`,
        { productId, size, quantity },
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể thêm vào giỏ.");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/cart/item/${cartItemId}`, getAuth());
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể xóa sản phẩm.");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/item/${cartItemId}`,
        { quantity },
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật số lượng.");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: FALLBACK_CART,
    loading: false,
    addLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCartMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // fetchCart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload ?? FALLBACK_CART;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.cart = FALLBACK_CART;
      });

    // addToCart
    builder
      .addCase(addToCart.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addLoading = false;
        state.successMessage = "Đã thêm vào giỏ hàng!";
        // Thêm item vào cart local nếu chưa có
        if (action.payload) {
          const exists = state.cart.cartItems?.find(
            (i) => i.id === action.payload.id
          );
          if (!exists) {
            state.cart.cartItems = [...(state.cart.cartItems || []), action.payload];
          }
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      });

    // removeCartItem
    builder
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart.cartItems = state.cart.cartItems?.filter(
          (item) => item.id !== action.payload
        );
      });

    // updateCartItem
    builder
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.cart.cartItems = state.cart.cartItems?.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      });
  },
});

export const { clearCartMessages } = cartSlice.actions;
export default cartSlice.reducer;
