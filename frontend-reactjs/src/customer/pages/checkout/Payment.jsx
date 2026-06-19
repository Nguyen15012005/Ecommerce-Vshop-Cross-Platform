import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-md lg:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#C6A15B]">
            Payment
          </p>

          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Thanh toán chuyển khoản
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Vui lòng quét mã QR hoặc chuyển khoản theo thông tin bên dưới
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* QR CARD */}
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border bg-gray-50 p-6">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=MB-BANK-123456789-DH001"
                alt="QR thanh toán"
                className="h-[240px] w-[240px] object-contain sm:h-[280px] sm:w-[280px]"
              />
            </div>

            <p className="mt-5 text-center text-sm font-medium text-gray-700">
              Quét mã bằng ứng dụng ngân hàng
            </p>

            <p className="mt-1 text-center text-xs text-gray-500">
              Không chỉnh sửa nội dung chuyển khoản
            </p>
          </div>

          {/* INFO CARD */}
          <div className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-800">
              Thông tin chuyển khoản
            </h2>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Ngân hàng</span>
                <span className="font-semibold text-gray-800">MB Bank</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Số tài khoản</span>
                <span className="font-semibold text-gray-800">123456789</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Chủ tài khoản</span>
                <span className="font-semibold text-gray-800">
                  NGUYEN NAM TRUNG
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Số tiền</span>
                <span className="text-lg font-bold text-red-500">579.000đ</span>
              </div>

              <div className="rounded-xl bg-yellow-50 px-4 py-3">
                <p className="text-sm text-gray-500">Nội dung chuyển khoản</p>
                <p className="mt-1 text-xl font-bold tracking-widest text-gray-900">
                  DH001
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-red-50 p-4 text-center">
              <p className="text-sm text-gray-600">
                Thời gian thanh toán còn lại
              </p>

              <p className="mt-1 text-3xl font-bold text-red-500">
                {formatTime(timeLeft)}
              </p>

              {timeLeft <= 0 && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  Mã thanh toán đã hết hạn
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() => navigate("/checkout")}
            variant="outlined"
            fullWidth
            sx={{
              py: "12px",
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Quay lại
          </Button>

          <Button
            onClick={() => navigate("/account/orders")}
            variant="contained"
            fullWidth
            sx={{
              py: "12px",
              borderRadius: "10px",
              textTransform: "none",
              background: "#C6A15B",
              "&:hover": { background: "#a07830" },
            }}
          >
            Tôi đã thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
