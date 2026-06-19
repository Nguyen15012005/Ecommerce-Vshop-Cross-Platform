import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const extractErrorMessage = (error, defaultMsg) => {
  const data = error.response?.data;
  if (!data) return defaultMsg;
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  if (data.error) return data.error;
  return defaultMsg;
};

export const sendLoginOtp = createAsyncThunk(
  "auth/sendLoginOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/sent/login-signup-otp`,
        { email: `signing_${email}`, role: "CUSTOMER" },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Không thể gửi OTP. Vui lòng thử lại."),
      );
    }
  },
);

export const sendRegisterOtp = createAsyncThunk(
  "auth/sendRegisterOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/sent/login-signup-otp`,
        { email, role: "CUSTOMER" },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Không thể gửi OTP. Vui lòng thử lại."),
      );
    }
  },
);

export const loginWithOtp = createAsyncThunk(
  "auth/loginWithOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signing`, {
        email,
        otp,
      });
      const data = response.data;
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);
      return data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "OTP không hợp lệ hoặc đã hết hạn."),
      );
    }
  },
);

export const sendSellerLoginOtp = createAsyncThunk(
  "auth/sendSellerLoginOtp",
  async ({ email, isLogin = false }, { rejectWithValue }) => {
    try {
      const emailToSend = isLogin ? `signing_${email}` : email;
      const response = await axios.post(
        `${API_BASE_URL}/auth/sent/login-signup-otp`,
        { email: emailToSend, role: "SELLER" },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Không thể gửi OTP cho Seller."),
      );
    }
  },
);

export const loginSellerWithOtp = createAsyncThunk(
  "auth/loginSellerWithOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sellers/login`, {
        email,
        otp,
      });
      const data = response.data;
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);
      return data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Đăng nhập Seller thất bại."),
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, fullName, phone, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        fullName,
        phone,
        otp,
      });
      const data = response.data;
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);
      return data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(
          error,
          "Đăng ký thất bại. Vui lòng kiểm tra OTP và thử lại.",
        ),
      );
    }
  },
);

export const registerSellerUser = createAsyncThunk(
  "auth/registerSellerUser",
  async ({ email, sellerName, phone, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sellers`, {
        email,
        sellerName,
        phone,
        password: otp, // Gửi OTP vào trường password để Backend verify
      });
      const data = response.data;
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);
      return data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Đăng ký Seller thất bại."),
      );
    }
  },
);

export const verifySellerEmail = createAsyncThunk(
  "auth/verifySellerEmail",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/sellers/verify/${otp}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Xác minh tài khoản Seller thất bại."),
      );
    }
  },
);

const initialState = {
  otpSent: false,
  sendOtpLoading: false,
  sendOtpError: null,
  jwt: localStorage.getItem("jwt") || null,
  role: localStorage.getItem("role") || null,
  loginLoading: false,
  loginError: null,
  registerLoading: false,
  registerError: null,
  sendRegisterOtpLoading: false,
  sendRegisterOtpError: null,
  registerOtpSent: false,
  isAuthenticated: !!localStorage.getItem("jwt"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.jwt = null;
      state.role = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.sendOtpError = null;
      state.loginError = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
    },
    resetOtpState(state) {
      state.otpSent = false;
      state.sendOtpError = null;
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginOtp.pending, (state) => {
        state.sendOtpLoading = true;
        state.sendOtpError = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.sendOtpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.sendOtpLoading = false;
        state.sendOtpError = action.payload;
      });

    builder
      .addCase(sendSellerLoginOtp.pending, (state) => {
        state.sendOtpLoading = true;
        state.sendOtpError = null;
      })
      .addCase(sendSellerLoginOtp.fulfilled, (state) => {
        state.sendOtpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendSellerLoginOtp.rejected, (state, action) => {
        state.sendOtpLoading = false;
        state.sendOtpError = action.payload;
      });

    builder
      .addCase(loginWithOtp.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginWithOtp.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginWithOtp.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      });

    builder
      .addCase(loginSellerWithOtp.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginSellerWithOtp.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginSellerWithOtp.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      });

    builder
      .addCase(sendRegisterOtp.pending, (state) => {
        state.sendRegisterOtpLoading = true;
        state.sendRegisterOtpError = null;
      })
      .addCase(sendRegisterOtp.fulfilled, (state) => {
        state.sendRegisterOtpLoading = false;
        state.registerOtpSent = true;
      })
      .addCase(sendRegisterOtp.rejected, (state, action) => {
        state.sendRegisterOtpLoading = false;
        state.sendRegisterOtpError = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      });

    builder
      .addCase(registerSellerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerSellerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(registerSellerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      });
  },
});

export const { logout, resetOtpState } = authSlice.actions;
export default authSlice.reducer;
