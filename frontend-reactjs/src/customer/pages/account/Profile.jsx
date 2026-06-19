import { Divider } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaLocationDot,
  FaCreditCard,
} from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

import Order from "./Order";
import UserDetails from "./UserDetails";
import SavedCards from "./SavedCards";
import OrderDetails from "./OrderDetails";
import Addresses from "./Addresses";

const menu = [
  { name: "Hồ sơ", path: "/account/profile", icon: <FaUser /> },
  { name: "Đơn hàng", path: "/account/orders", icon: <FaBoxOpen /> },
  { name: "Địa chỉ", path: "/account/addresses", icon: <FaLocationDot /> },
  {
    name: "Tài khoản thanh toán",
    path: "/account/saved-card",
    icon: <FaCreditCard />,
  },
  { name: "Đăng xuất", path: "/", icon: <IoLogOut /> },
];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    fullName: "Nguyễn Nam Trung Nguyên",
  };

  const handleClick = (item) => {
    navigate(item.path);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[#F2E8D7] bg-white p-5 shadow-[0_20px_60px_rgba(201,169,110,0.14)] lg:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
              My Account
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#3B2B12] lg:text-3xl">
              {user.fullName}
            </h1>

            <p className="mt-1 text-sm text-[#8B7355]">
              Quản lý hồ sơ, đơn hàng và thông tin thanh toán
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-xl font-bold text-white shadow-[0_10px_24px_rgba(201,169,110,0.35)]">
            {user.fullName.charAt(0)}
          </div>
        </div>

        <Divider sx={{ borderColor: "#EEE4D2" }} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="h-fit rounded-[28px] border border-[#F2E8D7] bg-[#FFFDF8] p-3 shadow-[0_8px_30px_rgba(201,169,110,0.08)]">
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
              {menu.map((item, index) => {
                const isActive =
                  item.path !== "/" && location.pathname.includes(item.path);

                const isLogout = item.name === "Đăng xuất";

                return (
                  <div
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`group flex min-w-fit flex-1 cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-all duration-300 lg:flex-none
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-white shadow-[0_10px_24px_rgba(201,169,110,0.35)]"
                        : isLogout
                          ? "text-red-500 hover:bg-red-50"
                          : "text-[#6B4F1D] hover:bg-white hover:text-[#B88A44] hover:shadow-[0_8px_24px_rgba(201,169,110,0.14)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-base ${isActive ? "text-white" : "text-[#B88A44]"}`}
                      >
                        {item.icon}
                      </span>

                      <span className="text-sm font-semibold lg:text-base">
                        {item.name}
                      </span>
                    </div>

                    {isLogout && <IoLogOut className="text-lg" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="min-h-[500px] rounded-[28px] border border-[#F2E8D7] bg-white p-4 shadow-[0_8px_30px_rgba(201,169,110,0.08)] lg:p-6">
              <Routes>
                <Route index element={<UserDetails />} />
                <Route path="profile" element={<UserDetails />} />
                <Route path="orders" element={<Order />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="saved-card" element={<SavedCards />} />
                <Route path="addresses" element={<Addresses />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
