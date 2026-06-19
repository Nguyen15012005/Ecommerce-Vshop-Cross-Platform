import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getAuth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
});

// ─── Thunks ────────────────────────────────────────────────────────────────────

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/wishlist`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách yêu thích.");
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/wishlist/add-product/${productId}`,
        {},
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể thêm vào yêu thích.");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────────

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: null, // { id, products: [] }
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearWishlistMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // fetchWishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload ?? { products: [] };
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
        state.wishlist = { products: [] };
      });

    // addToWishlist
    builder
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.successMessage = "Đã thêm vào danh sách yêu thích!";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearWishlistMessages } = wishlistSlice.actions;
export default wishlistSlice.reducer;
