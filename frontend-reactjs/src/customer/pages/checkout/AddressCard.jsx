import { Radio } from "@mui/material";
import React from "react";

const AddressCard = ({ address, value, selectedValue, handleChange }) => {
  const isSelected = value === selectedValue;

  return (
    <div
      className={`flex cursor-pointer gap-4 rounded-xl p-5 transition-all duration-300 ${
        isSelected
          ? "border-2 bg-gray-200 shadow"
          : "border hover:border-gray-800 hover:shadow-sm"
      }`}
      onClick={() => handleChange({ target: { value } })}
    >
      <div className="flex items-start pt-1">
        <Radio
          checked={isSelected}
          onChange={handleChange}
          value={value}
          name="address-radio"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-[15px] font-semibold text-gray-800">
            {address?.name || "Chưa có tên"}
          </h1>

          {isSelected && (
            <span className="rounded bg-[#C6A15B] px-2 py-[2px] text-[11px] text-white">
              Đang chọn
            </span>
          )}
        </div>

        <p className="max-w-[420px] text-sm leading-relaxed text-gray-600">
          {address?.address}, {address?.locality}, {address?.city},{" "}
          {address?.state} - {address?.pinCode}
        </p>

        <p className="text-sm text-gray-700">
          <span className="font-medium">SĐT:</span>{" "}
          {address?.mobile || "Chưa có số điện thoại"}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
