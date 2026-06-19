import React from "react";
import { useNavigate } from "react-router-dom";

const ShopByCategoryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `/product-list?category=${item.category || item.title?.toLowerCase()}`,
    );
  };

  return (
    <div
      onClick={handleNavigate}
      className="
        group
        relative
        h-[260px]
        cursor-pointer
        overflow-hidden
        rounded-3xl
        shadow-md
        transition-all
        duration-500
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.title}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/30
          to-transparent
        "
      ></div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="mb-1 text-xs uppercase tracking-[3px] text-gray-200">
          {item.item}
        </p>

        <h3 className="text-xl font-bold transition group-hover:translate-x-1">
          {item.title}
        </h3>
      </div>
    </div>
  );
};

export default ShopByCategoryCard;
