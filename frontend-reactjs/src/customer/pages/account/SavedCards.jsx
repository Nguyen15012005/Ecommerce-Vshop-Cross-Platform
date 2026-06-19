import React from "react";
import AddCardIcon from "@mui/icons-material/AddCard";

const SavedCards = () => {
  const handleAddCard = () => {
    alert("Chức năng thêm thẻ sẽ được hoàn thiện sau");
  };

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-[24px] border border-[#F2E8D7] bg-[#FFFDF8] px-5 py-14 text-center shadow-[0_8px_30px_rgba(201,169,110,0.08)]">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#FFF7E8] text-[#B88A44] sm:h-32 sm:w-32">
        <AddCardIcon sx={{ fontSize: 76 }} />
      </div>

      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-xl font-bold text-[#3B2B12]">
          Lưu thẻ tín dụng / ghi nợ
        </h1>

        <p className="text-sm leading-6 text-[#8B7355]">
          Thanh toán nhanh và tiện lợi hơn với thẻ đã lưu. Thông tin thẻ của bạn
          sẽ được bảo mật an toàn.
        </p>
      </div>

      <button
        onClick={handleAddCard}
        className="rounded-2xl bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(201,169,110,0.25)]"
      >
        + Thêm thẻ mới
      </button>
    </div>
  );
};

export default SavedCards;
