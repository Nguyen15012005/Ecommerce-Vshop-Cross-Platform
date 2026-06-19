import React from "react";
import OrderItem from "./OrderItem";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Order = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[24px] border border-[#F2E8D7] bg-gradient-to-r from-[#FFFDF8] to-[#FAF5EA] p-5 shadow-[0_8px_30px_rgba(201,169,110,0.08)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-white">
            <ShoppingBagOutlinedIcon sx={{ fontSize: 28 }} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#3B2B12]">
              Tất cả đơn hàng
            </h1>
            <p className="mt-1 text-sm text-[#8B7355]">
              Theo dõi và quản lý các đơn hàng của bạn
            </p>
          </div>
        </div>

        <div className="w-fit rounded-2xl border border-[#EADFCB] bg-white px-4 py-2 shadow-sm">
          <span className="text-sm font-semibold text-[#B88A44]">
            4 đơn hàng
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-3 overflow-x-auto pb-1">
        {["Tất cả", "Đang giao", "Hoàn thành", "Đã hủy"].map((item, index) => (
          <button
            key={item}
            className={`min-w-max rounded-full px-5 py-2 text-sm font-semibold ${
              index === 0
                ? "bg-gradient-to-r from-[#D6B57A] to-[#B88A44] text-white"
                : "border border-[#EADFCB] bg-white text-[#8B7355]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {[1, 2, 3, 4].map((item) => (
          <OrderItem key={item} />
        ))}
      </div>
    </div>
  );
};

export default Order;
