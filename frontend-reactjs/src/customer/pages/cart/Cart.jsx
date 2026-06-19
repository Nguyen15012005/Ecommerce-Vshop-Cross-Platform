import { Alert, Button, CircularProgress, IconButton, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { Close, Favorite, LocalOffer } from "@mui/icons-material";
import CartItem from "./CartItem";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../store/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((s) => s.cart);
  const cartItems = cart?.cartItems || [];

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    if (couponInput === "SAVE20") {
      setAppliedCoupon(couponInput);
      setErrorMessage("");
    } else {
      setErrorMessage("Mã không hợp lệ");
    }
    setOpenSnackbar(true);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setCouponInput("");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress sx={{ color: "#C9A96E" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 sm:px-10 md:px-20 lg:px-28">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="space-y-4 rounded-2xl border bg-white px-5 py-5 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-center font-medium text-gray-700">
                <LocalOffer sx={{ color: red[700], fontSize: "28px" }} />
                <span className="text-xl font-bold text-gray-700">
                  Áp dụng mã giảm giá
                </span>
              </div>

              <div className="flex items-center gap-2">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Nhập mã..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <Button
                  onClick={handleApplyCoupon}
                  variant="contained"
                  sx={{
                    height: "40px",
                    minWidth: "90px",
                    background: "#C6A15B",
                    "&:hover": { background: "#a07830" },
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Áp dụng
                </Button>
              </div>

              {appliedCoupon && (
                <div className="flex">
                  <div className="flex items-center gap-2 rounded-full border bg-gray-100 px-3 py-1">
                    <span className="text-xs font-medium text-gray-700">
                      {appliedCoupon}
                    </span>
                    <IconButton size="small" onClick={handleRemoveCoupon}>
                      <Close className="text-red-500" />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>

            <section className="rounded-2xl border bg-white shadow-sm">
              <PricingCard cart={cart} coupon={appliedCoupon} />
              <div className="p-5 pt-0">
                <Button
                  onClick={() => navigate("/checkout")}
                  sx={{
                    py: "12px",
                    borderRadius: "10px",
                    background: "#C6A15B",
                    fontWeight: 600,
                    "&:hover": { background: "#a07830" },
                  }}
                  variant="contained"
                  fullWidth
                >
                  Thanh toán
                </Button>
              </div>
            </section>

            <div
              onClick={() => navigate("/wishlist")}
              className="flex cursor-pointer items-center justify-between rounded-2xl border bg-white px-5 py-4 shadow-sm transition hover:bg-gray-50"
            >
              <span className="font-medium text-gray-700">
                Thêm từ danh sách yêu thích
              </span>
              <Favorite sx={{ fontSize: 24, color: red[500] }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[70vh] flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
          <div className="py-5 text-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Giỏ hàng của bạn đang trống
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Hãy thêm sản phẩm để tiếp tục mua sắm
            </p>
          </div>
          <Button
            onClick={() => navigate("/wishlist")}
            variant="outlined"
            sx={{ py: "11px", borderRadius: "8px", textTransform: "none" }}
          >
            Thêm từ danh sách yêu thích
          </Button>
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={errorMessage ? "error" : "success"}>
          {errorMessage || "Áp dụng mã thành công"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
