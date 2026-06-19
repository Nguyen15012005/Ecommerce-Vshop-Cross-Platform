import React from "react";

const UserAddressCard = ({ item }) => {
  return (
    <div className="rounded-[24px] border border-[#F2E8D7] bg-[#FFFDF8] p-5 shadow-[0_8px_30px_rgba(201,169,110,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(201,169,110,0.16)]">
      <div className="space-y-3">
        <h1 className="text-lg font-bold text-[#3B2B12]">{item.name}</h1>

        <p className="text-sm leading-6 text-[#8B7355]">
          {item.address}, {item.locality}, {item.city}, {item.state} -{" "}
          {item.pinCode}
        </p>

        <p className="text-sm text-[#6B4F1D]">
          <strong>Mobile:</strong> {item.mobile}
        </p>
      </div>
    </div>
  );
};

export default UserAddressCard;
