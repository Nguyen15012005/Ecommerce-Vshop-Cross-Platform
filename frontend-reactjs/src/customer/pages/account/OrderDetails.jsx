import React from "react";
import { Box, Button, Divider } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";

const OrderDetails = () => {
  const navigate = useNavigate();

  const orderItem = {
    product: {
      id: 1,
      title: "Rolex Submariner Date",
      image:
        "https://media.rolex.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1775305331/rolexcom/094398bf1f99/navigation/classic-watches-day-date-naviguation-square",
      seller: {
        businessName: "DailyZone Luxury Store",
      },
    },
    size: "FREE",
    quantity: 1,
    mrpPrice: 150000000,
    sellingPrice: 120000000,
  };

  const order = {
    orderStatus: "DELIVERED",
    orderCode: "#123456",
    shippingAddress: {
      name: "Nguyễn Nam Trung Nguyên",
      mobile: "0901234567",
      address: "12 Nguyễn Văn Bảo",
      city: "Gò Vấp",
      state: "TP. Hồ Chí Minh",
      pinCode: "700000",
    },
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const handleCancelOrder = () => {
    alert("Đã gửi yêu cầu hủy đơn hàng");
    navigate("/account/orders");
  };

  const handleReview = () => {
    navigate(`/product-detail/${orderItem.product.id}`);
  };

  return (
    <Box className="min-h-screen bg-[#FAF8F3] px-4 py-8 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button
          onClick={() => navigate("/account/orders")}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            borderColor: "#C9A96E",
            color: "#B88A44",
          }}
        >
          Quay lại đơn hàng
        </Button>

        <section className="overflow-hidden rounded-[32px] border border-[#F2E8D7] bg-white shadow-[0_20px_60px_rgba(201,169,110,0.14)]">
          <div className="bg-gradient-to-r from-[#E6C58A] via-[#D6B57A] to-[#B88A44] px-6 py-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFF7E8]">
              Order Details
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Chi tiết đơn hàng {order.orderCode}
            </h1>

            <p className="mt-1 text-sm text-[#FFF3DD]">
              Theo dõi trạng thái, địa chỉ giao hàng và thông tin thanh toán
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 p-6 text-center lg:flex-row lg:text-left">
            <div
              onClick={() =>
                navigate(`/product-detail/${orderItem.product.id}`)
              }
              className="cursor-pointer overflow-hidden rounded-3xl bg-[#FFFDF8] p-4 shadow-inner"
            >
              <img
                className="h-[150px] w-[150px] object-cover transition-transform duration-500 hover:scale-105"
                src={orderItem.product.image}
                alt={orderItem.product.title}
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-center lg:justify-start">
                <span className="rounded-full bg-[#FFF3DD] px-4 py-1 text-xs font-semibold text-[#B88A44]">
                  Đã giao hàng
                </span>
              </div>

              <h2
                onClick={() =>
                  navigate(`/product-detail/${orderItem.product.id}`)
                }
                className="cursor-pointer text-2xl font-bold text-[#3B2B12] hover:text-[#B88A44]"
              >
                {orderItem.product.title}
              </h2>

              <p className="flex items-center justify-center gap-2 text-sm font-medium text-[#8B7355] lg:justify-start">
                <StorefrontIcon sx={{ fontSize: 18 }} />
                {orderItem.product.seller.businessName}
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start">
                <span className="rounded-full bg-[#FAF5EA] px-4 py-2 text-sm font-medium text-[#6B4F1D]">
                  Size: {orderItem.size}
                </span>

                <span className="rounded-full bg-[#FAF5EA] px-4 py-2 text-sm font-medium text-[#6B4F1D]">
                  Số lượng: {orderItem.quantity}
                </span>
              </div>
            </div>

            <Button
              onClick={handleReview}
              startIcon={<RateReviewIcon />}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(135deg, #D6B57A 0%, #C9A96E 50%, #B88A44 100%)",
                borderRadius: "14px",
                px: 3,
                py: 1.2,
                textTransform: "none",
                "&:hover": {
                  background: "#fff",
                  color: "#B88A44",
                  border: "1px solid #C9A96E",
                },
              }}
            >
              Viết đánh giá
            </Button>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#F2E8D7] bg-white p-5 shadow-[0_8px_30px_rgba(201,169,110,0.08)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-white">
              <LocalShippingIcon />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#3B2B12]">
                Trạng thái đơn hàng
              </h2>

              <p className="text-sm text-[#8B7355]">
                Cập nhật tiến trình giao hàng mới nhất
              </p>
            </div>
          </div>

          <OrderStepper orderStatus={order.orderStatus} />
        </section>

        <section className="rounded-[28px] border border-[#F2E8D7] bg-white p-5 shadow-[0_8px_30px_rgba(201,169,110,0.08)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF5EA] text-[#B88A44]">
              <LocationOnIcon />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#3B2B12]">
                Địa chỉ giao hàng
              </h2>

              <p className="text-sm text-[#8B7355]">
                Thông tin người nhận đơn hàng
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#F2E8D7] bg-[#FFFCF6] p-5 text-sm">
            <div className="mb-3 flex flex-wrap items-center gap-4 font-semibold text-[#3B2B12]">
              <p>{order.shippingAddress.name}</p>
              <Divider flexItem orientation="vertical" />
              <p>{order.shippingAddress.mobile}</p>
            </div>

            <p className="leading-6 text-[#8B7355]">
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} - {order.shippingAddress.pinCode}
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-[28px] border border-[#F2E8D7] bg-white shadow-[0_8px_30px_rgba(201,169,110,0.08)]">
          <div className="flex justify-between gap-5 p-5 text-sm">
            <div className="space-y-1">
              <p className="text-lg font-bold text-[#3B2B12]">
                Tổng tiền sản phẩm
              </p>

              <p className="text-[#8B7355]">
                Bạn đã tiết kiệm{" "}
                <span className="font-semibold text-green-600">
                  {formatPrice(orderItem.mrpPrice - orderItem.sellingPrice)}
                </span>
              </p>
            </div>

            <p className="text-xl font-bold text-[#B88A44]">
              {formatPrice(orderItem.sellingPrice)}
            </p>
          </div>

          <div className="px-5">
            <div className="flex items-center gap-3 rounded-2xl bg-[#FFF7E8] px-5 py-3 text-sm font-semibold text-[#B88A44]">
              <PaymentsIcon />
              <p>Thanh toán khi nhận hàng</p>
            </div>
          </div>

          <Divider sx={{ my: 3, borderColor: "#EEE4D2" }} />

          <div className="px-5 pb-5">
            <p className="text-sm text-[#8B7355]">
              <strong className="text-[#3B2B12]">Bán bởi:</strong>{" "}
              {orderItem.product.seller.businessName}
            </p>
          </div>

          <div className="p-5 pt-0">
            <Button
              onClick={handleCancelOrder}
              sx={{
                py: "0.8rem",
                borderRadius: "14px",
                fontWeight: 700,
                borderColor: "#C9A96E",
                color: "#B88A44",
                textTransform: "none",
                "&:hover": {
                  background: "#C9A96E",
                  color: "#fff",
                  borderColor: "#C9A96E",
                },
              }}
              variant="outlined"
              fullWidth
            >
              Hủy đơn hàng
            </Button>
          </div>
        </section>
      </div>
    </Box>
  );
};

export default OrderDetails;
