import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { colors } from "../../../../data/Filter/color";
import { price } from "../../../../data/Filter/price";
import { discount } from "../../../../data/Filter/discount";

const GOLD = "#C6A15B";
const GOLD_DARK = "#a07830";
const GOLD_BG = "#fdf6ea";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ thêm state mở mobile
  const [openMobile, setOpenMobile] = useState(false);

  const updateFilterParams = (name, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(name, value);
    else newParams.delete(name);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => setSearchParams(new URLSearchParams());

  const selected = {
    color: searchParams.get("color"),
    price: searchParams.get("price"),
    discount: searchParams.get("discount"),
  };

  return (
    <>
      {/* ✅ FIX: bọc riêng để không bị nằm chung hàng */}
      <div className="lg:hidden w-full mb-4">
        <button
          onClick={() => setOpenMobile(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <span className="text-sm font-medium text-gray-700">Bộ lọc</span>
        </button>
      </div>

      {/* ✅ Overlay mobile */}
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      {/* ✅ Filter */}
      <div
        className={`
          bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5
          lg:sticky lg:top-20

          fixed top-0 left-0 h-full w-[85%] max-w-sm z-50
          transform transition-transform duration-300
          ${openMobile ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-auto lg:w-full
        `}
      >
        {/* ✅ Nút đóng mobile */}
        <div className="lg:hidden flex justify-end mb-2">
          <button onClick={() => setOpenMobile(false)}>✕</button>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900 tracking-tight">
            Bộ lọc
          </h2>
          <button
            onClick={clearAllFilters}
            className="text-[13px] text-gray-400 transition px-2.5 py-1 rounded-lg"
            onMouseEnter={(e) => {
              e.target.style.background = GOLD_BG;
              e.target.style.color = GOLD_DARK;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "";
              e.target.style.color = "";
            }}
          >
            Xoá tất cả
          </button>
        </div>

        {/* COLOR */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Màu sắc
          </p>
          <div className="grid grid-cols-5 gap-y-3 gap-x-2">
            {colors.slice(0, expandColor ? colors.length : 10).map((item) => {
              const isActive = selected.color === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() =>
                    updateFilterParams("color", isActive ? null : item.name)
                  }
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className="w-8 h-8 rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: item.hex,
                      border: `2px solid ${isActive ? GOLD : "#e5e7eb"}`,
                      outline: isActive
                        ? `2.5px solid ${GOLD}40`
                        : "2.5px solid transparent",
                      outlineOffset: "2px",
                      transform: isActive ? "scale(1.13)" : "scale(1)",
                    }}
                  />
                  <span className="text-[10.5px] text-gray-500 group-hover:text-gray-800 leading-none">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setExpandColor(!expandColor)}
            className="mt-3 flex items-center gap-1 text-[12.5px] font-medium transition"
            style={{ color: GOLD_DARK }}
          >
            <span>{expandColor ? "Thu gọn" : "Xem thêm"}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform ${
                expandColor ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <hr className="border-gray-100" />

        {/* PRICE */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Khoảng giá
          </p>
          <div className="grid grid-cols-2 gap-2">
            {price.map((item) => {
              const isActive = selected.price === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() =>
                    updateFilterParams("price", isActive ? null : item.value)
                  }
                  className="px-3 py-2 rounded-xl text-[12.5px] font-medium border transition-all duration-150"
                  style={
                    isActive
                      ? { background: GOLD, color: "#fff", borderColor: GOLD }
                      : {
                          background: "#fff",
                          color: "#6b7280",
                          borderColor: "#e5e7eb",
                        }
                  }
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* DISCOUNT */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Giảm giá
          </p>
          <div className="flex flex-wrap gap-2">
            {discount.map((item) => {
              const isActive = selected.discount === String(item.value);
              return (
                <span
                  key={item.value}
                  onClick={() =>
                    updateFilterParams("discount", isActive ? null : item.value)
                  }
                  className="cursor-pointer px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-all duration-150"
                  style={
                    isActive
                      ? { background: GOLD, color: "#fff", borderColor: GOLD }
                      : {
                          background: "#fff",
                          color: GOLD_DARK,
                          borderColor: "#e5e7eb",
                        }
                  }
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* ✅ ACTION BUTTON MOBILE */}
        <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-white pt-4 border-t flex gap-3">
          <button
            onClick={clearAllFilters}
            className="flex-1 py-3 rounded-xl border text-sm font-medium text-gray-600"
          >
            Làm mới
          </button>

          <button
            onClick={() => setOpenMobile(false)}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
            style={{ background: GOLD }}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
