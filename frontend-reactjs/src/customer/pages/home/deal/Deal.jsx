import React from "react";
import DealCard from "./DealCard";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ─── Dữ liệu tĩnh fallback ────────────────────────────────────────────────────
const FALLBACK_DEALS = [
  {
    id: 1,
    category: "Sneaker",
    name: "Giày Sneaker Thời Trang Cao Cấp",
    discount: 20,
    oldPrice: "500K",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  },
  {
    id: 2,
    category: "Laptop",
    name: "Laptop Gaming Hiệu Năng Cao",
    discount: 15,
    oldPrice: "25.000K",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&q=80",
  },
  {
    id: 3,
    category: "Điện thoại",
    name: "Điện Thoại Smartphone Màn Hình Lớn",
    discount: 10,
    oldPrice: "12.000K",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
  },
  {
    id: 4,
    category: "Tai nghe",
    name: "Tai Nghe Bluetooth Chống Ồn",
    discount: 30,
    oldPrice: "1.200K",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 5,
    category: "Đồng hồ",
    name: "Đồng Hồ Thời Trang Nam Nữ",
    discount: 25,
    oldPrice: "2.000K",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80",
  },
  {
    id: 6,
    category: "Balo",
    name: "Balo Laptop Chống Nước Cao Cấp",
    discount: 18,
    oldPrice: "700K",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 7,
    category: "Áo khoác",
    name: "Áo Khoác Streetwear Unisex",
    discount: 35,
    oldPrice: "900K",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
  },
  {
    id: 8,
    category: "Camera",
    name: "Máy Ảnh Du Lịch Mini Cao Cấp",
    discount: 12,
    oldPrice: "8.500K",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
  },
];

const NextArrow = ({ style, onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-6 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg transition hover:scale-110"
    style={{ ...style, display: "block" }}
  >
    <ChevronRight size={18} />
  </button>
);

const PrevArrow = ({ style, onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-6 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg transition hover:scale-110"
    style={{ ...style, display: "block" }}
  >
    <ChevronLeft size={18} />
  </button>
);

const Deal = () => {
  // Luôn dùng fallback deals (dữ liệu tĩnh đẹp)
  // Khi DB có endpoint deals riêng thì thay thế bằng useSelector
  const deals = FALLBACK_DEALS;

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative px-3 py-10 md:px-5 lg:px-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C6A15B]">
            Flash Sale
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#d7a343] md:text-4xl">
            🔥 Deal Hot Hôm Nay
          </h2>
        </div>
        <button className="text-sm text-gray-600 transition hover:text-black">
          Xem tất cả →
        </button>
      </div>

      <div className="relative px-8">
        <Slider {...settings}>
          {deals.map((item) => (
            <div key={item.id} className="px-2">
              <div className="transition duration-300 hover:-translate-y-2">
                <DealCard item={item} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Deal;
