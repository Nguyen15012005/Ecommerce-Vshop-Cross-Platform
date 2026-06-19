import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getAuth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
});

// ─── Fallback ──────────────────────────────────────────────────────────────────
const FALLBACK_REVIEWS = [
  {
    id: 1,
    reviewText: "Sản phẩm chất lượng tốt, mẫu mã đẹp.",
    reviewRating: 4.5,
    createdAt: "2024-01-01T00:00:00",
    user: { fullName: "Nguyễn Nam Trung Nguyên" },
    productImages: [
      "https://wwd.com/wp-content/uploads/2025/02/etro-fw25-rtw-r-gg-0001.jpg",
    ],
  },
  {
    id: 2,
    reviewText: "Giao hàng nhanh, đóng gói cẩn thận.",
    reviewRating: 5,
    createdAt: "2024-01-02T00:00:00",
    user: { fullName: "Trần Thị Bảo Châu" },
    productImages: [],
  },
];

// ─── Thunks ────────────────────────────────────────────────────────────────────

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/products/${productId}/reviews`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải đánh giá.");
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, reviewText, reviewRating, productImages }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/products/${productId}/reviews`,
        { reviewText, reviewRating, productImage: productImages || [] },
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể gửi đánh giá.");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/reviews/${reviewId}`, getAuth());
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể xóa đánh giá.");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────────

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    createLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearReviewMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // fetchReviews
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews =
          Array.isArray(action.payload) && action.payload.length > 0
            ? action.payload
            : FALLBACK_REVIEWS;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.loading = false;
        state.reviews = FALLBACK_REVIEWS;
      });

    // createReview
    builder
      .addCase(createReview.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.createLoading = false;
        state.successMessage = "Đánh giá đã được gửi!";
        if (action.payload) {
          state.reviews = [action.payload, ...state.reviews];
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });

    // deleteReview
    builder
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r.id !== action.payload);
        state.successMessage = "Đã xóa đánh giá.";
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearReviewMessages } = reviewSlice.actions;
export default reviewSlice.reducer;
