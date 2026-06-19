import { Divider } from "@mui/material";
import { IoLogOut } from "react-icons/io5";
import {
  FaUser,
  FaBoxOpen,
  FaLocationDot,
  FaCreditCard,
} from "react-icons/fa6";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Order from "./Order";
import SavedCards from "./SavedCards";
import UserDetails from "./UserDetails";
import Addresses from "./Addresses";
import OrderDetails from "./OrderDetails";
import { logout } from "../../../store/authSlice";

const menu = [
  { name: "Hồ sơ", path: "/account/profile", icon: <FaUser /> },
  { name: "Đơn hàng", path: "/account/orders", icon: <FaBoxOpen /> },
  { name: "Địa chỉ", path: "/account/addresses", icon: <FaLocationDot /> },
  {
    name: "Tài khoản thanh toán",
    path: "/account/saved-card",
    icon: <FaCreditCard />,
  },
  { name: "Đăng xuất", path: "/", icon: <IoLogOut />, action: "logout" },
];

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile: user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleClick = (item) => {
    if (item.action === "logout") {
      handleLogout();
      return;
    }

    navigate(item.path);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-3 py-5 sm:px-5 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#F2E8D7] bg-white shadow-[0_20px_60px_rgba(201,169,110,0.14)]">
        <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
              My Account
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#3B2B12] sm:text-3xl">
              {user?.fullName || "Người dùng"}
            </h1>

            <p className="mt-1 text-sm leading-6 text-[#8B7355]">
              Quản lý hồ sơ, đơn hàng, địa chỉ và phương thức thanh toán
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-xl font-bold text-white shadow-[0_10px_24px_rgba(201,169,110,0.35)]">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>

        <Divider sx={{ borderColor: "#EEE4D2" }} />

        <div className="grid grid-cols-1 gap-5 p-4 sm:p-5 lg:grid-cols-[280px_1fr] lg:p-6">
          <aside className="h-fit rounded-[24px] border border-[#F2E8D7] bg-[#FFFDF8] p-2 shadow-[0_8px_30px_rgba(201,169,110,0.08)] lg:sticky lg:top-24">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {menu.map((item, index) => {
                const isLogout = item.action === "logout";
                const isActive =
                  !isLogout && location.pathname.includes(item.path);

                return (
                  <button
                    type="button"
                    onClick={() => handleClick(item)}
                    key={index}
                    className={`group flex min-w-max items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 lg:w-full
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-white shadow-[0_10px_24px_rgba(201,169,110,0.35)]"
                        : isLogout
                          ? "text-red-500 hover:bg-red-50"
                          : "text-[#6B4F1D] hover:bg-white hover:text-[#B88A44] hover:shadow-[0_8px_24px_rgba(201,169,110,0.14)]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`text-base transition-transform duration-300 group-hover:scale-110 ${
                          isActive
                            ? "text-white"
                            : isLogout
                              ? "text-red-500"
                              : "text-[#B88A44]"
                        }`}
                      >
                        {item.icon}
                      </span>

                      <span className="text-sm font-semibold">{item.name}</span>
                    </span>

                    {isLogout && <IoLogOut className="text-lg" />}
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="min-h-[520px] rounded-[24px] border border-[#F2E8D7] bg-white p-3 shadow-[0_8px_30px_rgba(201,169,110,0.08)] sm:p-5 lg:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<UserDetails />} />
              <Route path="orders" element={<Order />} />
              <Route path="orders/:id" element={<OrderDetails />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="saved-card" element={<SavedCards />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
