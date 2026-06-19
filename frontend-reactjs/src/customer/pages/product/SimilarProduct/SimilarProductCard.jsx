import React from "react";
import { FavoriteBorder, ShoppingBagOutlined, Star } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SimilarProductCard = ({ product }) => {
  const navigate = useNavigate();

  const productId = product?.id || product || 1;

  return (
    <div
      onClick={() => navigate(`/product-detail/${productId}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-[#F2E8D7] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(201,169,110,0.18)]"
    >
      {/* IMAGE */}
      <div className="relative h-[230px] overflow-hidden bg-[#FFF7E8]">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          src="https://images.pexels.com/photos/8485550/pexels-photo-8485550.jpeg"
          alt="Sản phẩm tương tự"
        />

        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow">
          -33%
        </span>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              navigate("/wishlist");
            }}
            size="small"
            sx={{
              background: "#fff",
              color: "#B88A44",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              "&:hover": {
                background: "#C9A96E",
                color: "#fff",
              },
            }}
          >
            <FavoriteBorder fontSize="small" />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cart");
            }}
            size="small"
            sx={{
              background: "#fff",
              color: "#B88A44",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              "&:hover": {
                background: "#C9A96E",
                color: "#fff",
              },
            }}
          >
            <ShoppingBagOutlined fontSize="small" />
          </IconButton>
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B88A44]">
          DailyZone
        </p>

        <h3 className="line-clamp-2 min-h-[44px] text-sm font-bold leading-5 text-[#3B2B12] transition group-hover:text-[#B88A44]">
          Áo thun cotton form rộng unisex cao cấp
        </h3>

        <div className="flex items-center gap-1 text-xs">
          <Star sx={{ fontSize: 16, color: "#f59e0b" }} />
          <span className="font-semibold text-[#3B2B12]">4.8</span>
          <span className="text-[#8B7355]">(128)</span>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <span className="text-base font-bold text-red-500">200.000₫</span>

          <span className="text-xs text-gray-400 line-through">300.000₫</span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
