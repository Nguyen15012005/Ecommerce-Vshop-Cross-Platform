import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getAuth = () => {
  const jwt = localStorage.getItem("jwt");

  return {
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
  };
};

const extractErrorMessage = (error, fallback) => {
  const data = error.response?.data;
  if (typeof data === "string") return data;
  return data?.message || data?.error || fallback;
};

export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sellers/profile`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể tải hồ sơ người bán."));
    }
  },
);

export const updateSellerProfile = createAsyncThunk(
  "seller/updateSellerProfile",
  async (seller, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/sellers`, seller, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể cập nhật hồ sơ người bán."));
    }
  },
);

export const fetchSellerReport = createAsyncThunk(
  "seller/fetchSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sellers/report`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể tải báo cáo người bán."));
    }
  },
);

export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sellers/products`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể tải sản phẩm người bán."));
    }
  },
);

export const createSellerProduct = createAsyncThunk(
  "seller/createSellerProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sellers/products`, product, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể tạo sản phẩm."));
    }
  },
);

export const updateSellerProduct = createAsyncThunk(
  "seller/updateSellerProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/sellers/products/${productId}`, product, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể cập nhật sản phẩm."));
    }
  },
);

export const deleteSellerProduct = createAsyncThunk(
  "seller/deleteSellerProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/sellers/products/${productId}`, getAuth());
      return productId;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể xóa sản phẩm."));
    }
  },
);

export const fetchSellerOrders = createAsyncThunk(
  "seller/fetchSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/seller/orders`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể tải đơn hàng người bán."));
    }
  },
);

export const updateSellerOrderStatus = createAsyncThunk(
  "seller/updateSellerOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/seller/orders/${orderId}/status/${orderStatus}`,
        {},
        getAuth(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Không thể cập nhật trạng thái đơn hàng."));
    }
  },
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    profile: null,
    report: null,
    products: [],
    orders: [],
    loading: false,
    productLoading: false,
    orderLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSellerMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.successMessage = "Đã cập nhật hồ sơ người bán.";
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })
      .addCase(fetchSellerProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      })
      .addCase(createSellerProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products];
        state.successMessage = "Đã tạo sản phẩm.";
      })
      .addCase(createSellerProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateSellerProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload?.id ? action.payload : product,
        );
        state.successMessage = "Đã cập nhật sản phẩm.";
      })
      .addCase(updateSellerProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteSellerProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.successMessage = "Đã xóa sản phẩm.";
      })
      .addCase(fetchSellerOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSellerOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload?.id ? action.payload : order,
        );
        state.successMessage = "Đã cập nhật trạng thái đơn hàng.";
      })
      .addCase(updateSellerOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSellerMessages } = sellerSlice.actions;
export default sellerSlice.reducer;
