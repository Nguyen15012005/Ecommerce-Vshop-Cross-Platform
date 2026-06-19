import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import AddressForm from "./AddresssForm";
import AddressCard from "./AddressCard";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../store/userSlice";
import { createOrder, clearOrderMessages } from "../../../store/orderSlice";
import PricingCard from "../cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "900px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "16px",
};

const paymentGatwayList = [
  {
    value: "COD",
    image: "https://cdn-icons-png.flaticon.com/512/2331/2331940.png",
    label: "Thanh toán khi nhận hàng",
  },
  {
    value: "MOMO",
    image:
      "https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0=w240-h480-rw",
    label: "Ví MoMo",
  },
  {
    value: "VNPAY",
    image:
      "https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg",
    label: "VNPay",
  },
  {
    value: "BANK_TRANSFER",
    image: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
    label: "Chuyển khoản ngân hàng",
  },
  {
    value: "ZALOPAY",
    image:
      "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png",
    label: "ZaloPay",
  },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((s) => s.user);
  const { cart } = useSelector((s) => s.cart);
  const { createLoading, paymentUrl, error, successMessage } = useSelector(
    (s) => s.order,
  );

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentGateway, setPaymentGateway] = useState("COD");
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  // địa chỉ thêm tạm ở frontend
  const [localAddresses, setLocalAddresses] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }

    if (successMessage && !paymentUrl) {
      setSnackOpen(true);
      setTimeout(() => navigate("/account/orders"), 1500);
    }
  }, [paymentUrl, successMessage, navigate]);

  const addresses = [...(profile?.addresses || []), ...localAddresses];

  const handleAddAddress = (newAddress) => {
    setLocalAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressIndex(addresses.length);
    setOpen(false);
  };

  const handleCreateOrder = () => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }

    if (addresses.length > 0 && addresses[selectedAddressIndex]) {
      const address = addresses[selectedAddressIndex];

      if (paymentGateway === "BANK_TRANSFER") {
        navigate("/payment");
        return;
      }

      dispatch(createOrder({ address, paymentMethod: paymentGateway }));
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="min-h-screen px-5 pt-10 sm:px-10 md:px-20 lg:px-20">
      <div className="grid grid-cols-1 gap-9 rounded-lg bg-gray-50 p-10 lg:grid-cols-3 lg:space-y-0">
        <div className="col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-700">
              Chọn địa chỉ giao hàng
            </span>

            <Button
              onClick={() => setOpen(true)}
              variant="outlined"
              sx={{ borderRadius: "10px", textTransform: "none" }}
            >
              Thêm địa chỉ
            </Button>
          </div>

          <div className="space-y-4 text-sm font-medium">
            <p className="text-gray-600">Địa chỉ đã lưu</p>

            <div className="space-y-3 rounded-xl border border-gray-300 p-4">
              {addresses.length > 0 ? (
                addresses.map((addr, index) => (
                  <AddressCard
                    key={index}
                    address={addr}
                    selectedValue={selectedAddressIndex}
                    value={index}
                    handleChange={(e) =>
                      setSelectedAddressIndex(Number(e.target.value))
                    }
                  />
                ))
              ) : (
                <p className="py-4 text-center text-sm text-gray-400">
                  Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ giao hàng.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-dashed bg-white px-5 py-4 transition hover:bg-gray-50">
            <Button
              onClick={() => setOpen(true)}
              startIcon={<AddIcon />}
              sx={{ textTransform: "none" }}
            >
              Thêm địa chỉ mới
            </Button>
          </div>
        </div>

        <div className="col-span-1 space-y-4 text-sm">
          <section className="space-y-3 rounded-xl border bg-white p-5 shadow-sm">
            <h1 className="text-center text-lg font-semibold text-gray-700">
              Chọn phương thức thanh toán
            </h1>

            <RadioGroup
              name="payment"
              className="space-y-3"
              onChange={(e) => setPaymentGateway(e.target.value)}
              value={paymentGateway}
            >
              {paymentGatwayList.map((item) => (
                <label
                  key={item.value}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                    paymentGateway === item.value
                      ? "border-2 bg-gray-200 shadow"
                      : "hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Radio value={item.value} />
                    <img
                      className="h-10 w-10 object-contain"
                      src={item.image}
                      alt={item.label}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </section>

          <section className="rounded-xl border bg-white shadow-sm">
            <PricingCard cart={cart} coupon="" />

            <div className="p-5">
              <Button
                onClick={handleCreateOrder}
                disabled={createLoading}
                sx={{
                  py: "12px",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  background: "#C6A15B",
                  "&:hover": { background: "#a07830" },
                }}
                variant="contained"
                fullWidth
              >
                {createLoading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  "Đặt hàng"
                )}
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <AddressForm
            handleClose={() => setOpen(false)}
            onAddAddress={handleAddAddress}
          />
        </Box>
      </Modal>

      <Snackbar
        open={snackOpen || !!error}
        autoHideDuration={3000}
        onClose={() => {
          setSnackOpen(false);
          dispatch(clearOrderMessages());
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={error ? "error" : "success"}>
          {error || successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
