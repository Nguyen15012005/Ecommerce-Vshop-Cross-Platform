import React from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ img1, img2, title, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl group"
    >
      <img
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        src={img1}
        alt={title}
      />

      <img
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
        src={img2}
        alt={title}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="text-lg font-semibold">{title}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(path);
          }}
          className="mt-2 rounded-full bg-white px-4 py-1.5 text-xs text-black opacity-0 translate-y-4 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Khám phá
        </button>
      </div>
    </div>
  );
};

const CategoryGrid = () => {
  return (
    <div className="px-3 py-6 md:px-5 lg:px-20">
      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-12
          auto-rows-[180px]
          lg:grid-rows-6
          lg:h-[600px]
        "
      >
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:row-span-6">
          <Item
            title="Thời trang nữ"
            path="/product-list?category=women"
            img1="https://pos.nvncdn.com/04d215-119681/ps/Vay-nu-thiet-ke-Nara-dress-Text-han-cao-cap-HIU-design.jpg?v=1760209002"
            img2="https://images2.thanhnien.vn/528068263637045248/2023/10/17/anh-3-16975509244451652815035.jpg"
          />
        </div>

        <div className="col-span-1 lg:col-span-3 lg:row-span-3">
          <Item
            title="Sneaker"
            path="/product-list?category=men&type=men_shoes"
            img1="https://images.unsplash.com/photo-1549298916-b41d501d3772"
            img2="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
          />
        </div>

        <div className="col-span-1 lg:col-span-3 lg:row-span-3">
          <Item
            title="Thể thao"
            path="/product-list?category=men&type=sportswear"
            img1="https://pos.nvncdn.com/a36e05-151378/ps/20250716_pXIULqCwhU.jpeg?v=1752631998"
            img2="https://pos.nvncdn.com/a36e05-151378/ps/20250715_pOY3TrUXZo.jpeg?v=1752546749"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:row-span-6">
          <Item
            title="Thời trang nam"
            path="/product-list?category=men"
            img1="https://images.unsplash.com/photo-1593032465175-481ac7f401a0"
            img2="https://format.vn//media/catalog/category/AOKHOACNAM.jpg"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-3">
          <Item
            title="Túi xách"
            path="/product-list?category=women&type=women_bag"
            img1="https://tuixachsieucap.com.vn/wp-content/uploads/2021/04/z2429499413183_eeb4b90cfb8ae5807efa74e8d4c2d124.jpg"
            img2="https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/03/tui-xach-tay-nu-louis-vuitton-lv-onthego-m46373-mau-nau-65e12debd7dec-01032024082251.jpg"
          />
        </div>

        <div className="col-span-1 lg:col-span-2 lg:row-span-3">
          <Item
            title="Trang sức"
            path="/product-list?category=women&type=jewelry"
            img1="https://cdn.brvn.vn/editor_news/2022/09/Trang-suc-2_1662383258.jpg"
            img2="https://images2.thanhnien.vn/528068263637045248/2024/9/24/eczpr-17271471207821373745275.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
