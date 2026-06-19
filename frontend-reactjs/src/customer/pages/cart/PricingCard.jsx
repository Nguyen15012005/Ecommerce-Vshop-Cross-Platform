import { Divider } from "@mui/material";
import React from "react";

const PricingCard = ({ cart, coupon }) => {
  // Dữ liệu từ cart API: totalPrice, totalDiscountedPrice, discount, totalItem
  const subtotal = cart?.totalMrpPrice || cart?.totalPrice || 0;
  const sellingTotal = cart?.totalSellingPrice || cart?.totalDiscountedPrice || 0;
  const platformDiscount = Math.max(subtotal - sellingTotal, 0);
  const shipping = subtotal > 500000 ? 0 : 79000; // miễn phí ship khi > 500k

  // Giảm thêm theo coupon
  let couponDiscount = 0;
  if (coupon === "SAVE20") {
    couponDiscount = Math.round(subtotal * 0.2);
  }

  const totalDiscount = platformDiscount + couponDiscount;
  const total = Math.max(subtotal - totalDiscount, 0) + shipping;

  const formatPrice = (price) =>
    price ? price.toLocaleString("vi-VN") + "đ" : "0đ";

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      {/* CONTENT */}
      <div className="space-y-4 p-5 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Tạm tính ({cart?.totalItem || 0} sản phẩm)</span>
          <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Giảm giá sản phẩm</span>
          <span className="font-medium text-green-600">
            -{formatPrice(platformDiscount)}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex items-center justify-between text-gray-600">
            <span>Mã giảm giá ({coupon})</span>
            <span className="font-medium text-green-600">
              -{formatPrice(couponDiscount)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-gray-600">
          <span>Phí vận chuyển</span>
          <span className={`font-medium ${shipping === 0 ? "text-teal-600" : "text-gray-800"}`}>
            {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Phí nền tảng</span>
          <span className="font-medium text-teal-600">Miễn phí</span>
        </div>
      </div>

      <Divider />

      {/* TOTAL */}
      <div className="flex items-center justify-between rounded-b-xl bg-gray-50 px-5 py-4">
        <span className="text-lg font-semibold">Tổng tiền</span>
        <span className="text-lg font-bold text-red-500">{formatPrice(total)}</span>
      </div>
    </div>
  );
};

export default PricingCard;
