import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";

const categories = [
  {
    id: 1,
    title: "Sneaker",
    item: "120 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    id: 2,
    title: "Laptop",
    item: "85 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&q=80",
  },
  {
    id: 3,
    title: "Điện thoại",
    item: "210 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
  },
  {
    id: 4,
    title: "Tai nghe",
    item: "65 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 5,
    title: "Đồng hồ",
    item: "95 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80",
  },
  {
    id: 6,
    title: "Camera",
    item: "40 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
  },
  {
    id: 7,
    title: "Balo",
    item: "70 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 8,
    title: "Gaming",
    item: "55 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80",
  },
  {
    id: 9,
    title: "Nội thất",
    item: "140 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
  },
  {
    id: 10,
    title: "Áo khoác",
    item: "90 sản phẩm",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
  },
];

const ShopByCategory = () => {
  return (
    <div className="px-3 md:px-5 lg:px-20 py-10 bg-[#fafafa]">
      {/* TITLE */}
      <div className="text-center mb-12">
        <p className="text-sm text-[#d3b67e] font-semibold tracking-widest uppercase">
          Category
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#d09a35] mt-2">
          Mua Sắm Danh Mục Nổi Bật
        </h2>

        <div className="w-20 h-1 mx-auto mt-4 bg-[#d09a35] rounded-full"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {categories.map((item) => (
          <ShopByCategoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
