import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getAuth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
});

// ─── Fallback ──────────────────────────────────────────────────────────────────
const FALLBACK_ORDERS = [
  {
    id: 123456,
    orderStatus: "PENDING",
    orderDate: "2024-01-01T00:00:00",
    totalSellingPrice: 120000000,
    orderItems: [
      {
        id: 1,
        product: {
          id: 1,
          title: "Rolex Submariner",
          description: "Đồng hồ cao cấp với thiết kế sang trọng.",
          images: [
            "https://media.rolex.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1775305331/rolexcom/094398bf1f99/navigation/classic-watches-day-date-naviguation-square",
          ],
          seller: { businessName: "DailyZone Luxury Store" },
        },
        size: "FREE",
        quantity: 1,
        mrpPrice: 150000000,
        sellingPrice: 120000000,
      },
    ],
    shippingAddress: {
      name: "Nguyễn Nam Trung Nguyên",
      mobile: "0901234567",
      address: "12 Nguyễn Văn Bảo",
      city: "Gò Vấp",
      state: "TP. Hồ Chí Minh",
      pinCode: "700000",
    },
  },
];

// ─── Thunks ────────────────────────────────────────────────────────────────────

export const fetchOrderHistory = createAsyncThunk(
  "order/fetchOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/orders/history`,
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải đơn hàng.");
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/orders/${orderId}`,
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không tìm thấy đơn hàng.");
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ address, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/orders?paymentMethod=${paymentMethod}`,
        address,
        getAuth()
      );
      return response.data; // { payment_link_url }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Đặt hàng thất bại.");
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/orders/${orderId}/cancel`,
        {},
        getAuth()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Hủy đơn hàng thất bại.");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────────

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderDetail: null,
    paymentUrl: null,
    loading: false,
    detailLoading: false,
    createLoading: false,
    cancelLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearOrderMessages(state) {
      state.error = null;
      state.successMessage = null;
      state.paymentUrl = null;
    },
    clearOrderDetail(state) {
      state.orderDetail = null;
    },
  },
  extraReducers: (builder) => {
    // fetchOrderHistory
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders =
          Array.isArray(action.payload) && action.payload.length > 0
            ? action.payload
            : FALLBACK_ORDERS;
      })
      .addCase(fetchOrderHistory.rejected, (state) => {
        state.loading = false;
        state.orders = FALLBACK_ORDERS;
      });

    // fetchOrderById
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.orderDetail = action.payload ?? FALLBACK_ORDERS[0];
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.detailLoading = false;
        state.orderDetail = FALLBACK_ORDERS[0];
      });

    // createOrder
    builder
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createLoading = false;
        state.paymentUrl = action.payload?.payment_link_url ?? null;
        state.successMessage = "Đặt hàng thành công!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });

    // cancelOrder
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.cancelLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelLoading = false;
        state.successMessage = "Đã hủy đơn hàng.";
        if (state.orderDetail?.id === action.payload?.id) {
          state.orderDetail = action.payload;
        }
        state.orders = state.orders.map((o) =>
          o.id === action.payload?.id ? action.payload : o
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderMessages, clearOrderDetail } = orderSlice.actions;
export default orderSlice.reducer;
