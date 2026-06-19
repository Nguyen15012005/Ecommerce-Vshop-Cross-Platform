import React from "react";
import { Facebook, Instagram, YouTube, Twitter } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-12 bg-[#FAF8F3] text-[#6B4F1D]">
      {/* CTA */}
      <div className="border-b border-[#EEE4D2] px-5 py-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[28px] border border-[#F2E8D7] bg-white p-6 shadow-[0_10px_35px_rgba(201,169,110,0.10)] lg:flex-row">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
              Newsletter
            </p>

            <h2 className="mb-2 text-2xl font-bold text-[#3B2B12]">
              Đăng ký nhận ưu đãi
            </h2>

            <p className="text-sm text-[#8B7355]">
              Nhận thông tin khuyến mãi & sản phẩm mới sớm nhất
            </p>
          </div>

          <div className="flex w-full gap-2 lg:w-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 rounded-full border border-[#EADFCB] bg-[#FFFDF8] px-4 py-3 text-[#3B2B12] outline-none transition placeholder:text-[#8B7355] focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 lg:w-[300px]"
            />

            <button className="rounded-full bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(201,169,110,0.25)] transition-all duration-300 hover:bg-white hover:text-[#B88A44] hover:ring-1 hover:ring-[#C9A96E]">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-20">
        {/* BRAND */}
        <div>
          <h1
            onClick={() => navigate("/")}
            className="mb-4 cursor-pointer text-2xl font-bold tracking-wide text-[#3B2B12]"
          >
            DailyZone
          </h1>

          <p className="mb-4 text-sm leading-relaxed text-[#8B7355]">
            Nền tảng thương mại điện tử hiện đại, mang đến trải nghiệm mua sắm
            nhanh chóng, tiện lợi và đáng tin cậy.
          </p>

          <div className="flex gap-3">
            {[Facebook, Instagram, YouTube, Twitter].map((Icon, index) => (
              <div
                key={index}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#EADFCB] bg-white text-[#B88A44] transition-all duration-300 hover:scale-105 hover:bg-[#C9A96E] hover:text-white"
              >
                <Icon fontSize="small" />
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY */}
        <div>
          <h2 className="mb-4 font-bold text-[#3B2B12]">Danh mục</h2>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/product-list?category=men"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Men
              </Link>
            </li>

            <li>
              <Link
                to="/product-list?category=women"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Women
              </Link>
            </li>

            <li>
              <Link
                to="/product-list?category=kid"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Kid
              </Link>
            </li>

            <li>
              <Link
                to="/product-list?category=furniture"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Furniture
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="mb-4 font-bold text-[#3B2B12]">Hỗ trợ</h2>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/contact"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Liên hệ
              </Link>
            </li>

            <li>
              <Link
                to="/policy"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Chính sách
              </Link>
            </li>

            <li>
              <Link
                to="/shipping"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Vận chuyển
              </Link>
            </li>

            <li>
              <Link
                to="/return"
                className="cursor-pointer text-[#8B7355] transition-all duration-200 hover:translate-x-1 hover:text-[#B88A44]"
              >
                Đổi trả
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="mb-4 font-bold text-[#3B2B12]">Liên hệ</h2>

          <p className="mb-2 text-sm text-[#8B7355]">
            Email: support@dailyzone.com
          </p>

          <p className="mb-4 text-sm text-[#8B7355]">Hotline: 1900 1234</p>

          <div className="rounded-2xl border border-[#F2E8D7] bg-white p-4 transition hover:shadow-[0_8px_25px_rgba(201,169,110,0.15)]">
            <p className="text-sm font-bold text-[#3B2B12]">Hỗ trợ 24/7</p>

            <p className="text-xs text-[#8B7355]">Luôn sẵn sàng giúp bạn</p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center justify-between border-t border-[#EEE4D2] px-5 py-6 text-sm text-[#8B7355] md:flex-row lg:px-20">
        <p>© 2026 DailyZone. All rights reserved.</p>

        <div className="mt-3 flex gap-5 md:mt-0">
          <Link
            to="/privacy"
            className="cursor-pointer transition hover:text-[#B88A44]"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="cursor-pointer transition hover:text-[#B88A44]"
          >
            Terms
          </Link>

          <Link
            to="/cookies"
            className="cursor-pointer transition hover:text-[#B88A44]"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
