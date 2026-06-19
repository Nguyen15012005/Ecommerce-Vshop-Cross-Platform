import React from "react";
import { useNavigate } from "react-router-dom";

const DealCard = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product-detail/${item.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group w-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {item.category}
        </p>

        <p className="line-clamp-2 h-10 text-sm font-semibold text-gray-800">
          {item.name}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-500">
            -{item.discount}%
          </span>

          <span className="text-xs text-gray-400 line-through">
            {item.oldPrice}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product-detail/${item.id}`);
          }}
          className="mt-3 w-full rounded-lg bg-gradient-to-r from-orange-400 to-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 active:scale-95"
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default DealCard;
