import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getAuth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
});

// ─── Fallback ──────────────────────────────────────────────────────────────────
const FALLBACK_USER = {
  fullName: "Khách hàng",
  email: "",
  mobile: "",
  addresses: [],
};

// ─── Thunks ────────────────────────────────────────────────────────────────────

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, getAuth());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải thông tin người dùng."
      );
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────────

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload ?? FALLBACK_USER;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false;
        state.profile = FALLBACK_USER;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
