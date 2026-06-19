import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";

import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Search,
  Storefront,
  Person,
  ShoppingBag,
  Logout,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import CategorySheet from "./CategorySheet";
import { logout } from "../../../store/authSlice";
import { fetchUserProfile } from "../../../store/userSlice";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openUserMenu = Boolean(anchorEl);

  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, user, dispatch]);

  const menuItems = [
    { name: "Trang Chủ", key: "/" },
    { name: "Nam", key: "men" },
    { name: "Nữ", key: "women" },
    { name: "Điện Tử", key: "electronics" },
    { name: "Nhà Bếp", key: "home_furnitures" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    if (openSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const requireLoginNavigate = (path) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("jwt");
    handleCloseUserMenu();
    navigate("/");
  };

  const handleCategoryNavigate = (key) => {
    if (key === "/") {
      navigate("/");
    } else {
      setSelectedCategory(key);
      navigate(`/product-list?category=${key}`);
    }

    setOpenMenu(false);
    setShowSheet(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/product-list?query=${encodeURIComponent(query)}`);
    setOpenSearch(false);
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-white text-[#6B4F1D] shadow-sm">
      <Box sx={{ zIndex: 2 }} className="sticky left-0 right-0 top-0 bg-white">
        <div>
          <div className="flex h-8 items-center justify-center bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44]">
            <span className="text-[11px] uppercase tracking-[2px] text-white">
              ✦ Miễn phí vận chuyển cho đơn hàng trên 500.000đ ✦
            </span>
          </div>

          <div className="flex h-[70px] items-center justify-between border-b border-[#F2E8D7] px-4 md:px-6 lg:px-20">
            <div className="flex items-center gap-3">
              {!isLarge && (
                <IconButton
                  onClick={() => setOpenMenu(true)}
                  className="hover:bg-[#FFF7E8]"
                >
                  <MenuIcon sx={{ color: "#B88A44" }} />
                </IconButton>
              )}

              <button onClick={() => navigate("/")}>
                <div className="flex cursor-pointer items-center gap-2 lg:gap-3">
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-[26px] text-[#C9A96E] lg:text-[40px]">
                      D
                    </span>

                    <span className="-mt-4 ml-2 font-serif text-[26px] text-[#C9A96E] lg:-mt-6 lg:ml-3 lg:text-[40px]">
                      Z
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="mb-1 font-serif text-[14px] tracking-[2px] text-[#3B2B12] sm:text-[16px] lg:mb-2 lg:text-[20px] lg:tracking-[3px]">
                      DAILY ZONE
                    </h1>

                    <span className="hidden text-[8px] uppercase tracking-[5px] text-[#8B7355] sm:block lg:text-[9px]">
                      Style your life
                    </span>
                  </div>
                </div>
              </button>

              {isLarge && (
                <ul className="ml-6 flex items-center space-x-3 text-[#6B4F1D]">
                  {menuItems.map((item) => (
                    <li
                      key={item.key}
                      onClick={() => handleCategoryNavigate(item.key)}
                      onMouseEnter={() => {
                        if (item.key === "/") return;

                        clearTimeout(timeoutRef.current);
                        setSelectedCategory(item.key);
                        setShowSheet(true);
                      }}
                      onMouseLeave={() => {
                        timeoutRef.current = setTimeout(() => {
                          setShowSheet(false);
                        }, 200);
                      }}
                      className="relative z-50 flex h-[70px] cursor-pointer items-center px-4 font-semibold transition-colors duration-300 hover:text-[#B88A44]"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <IconButton
                onClick={() => setOpenSearch(true)}
                className="hover:bg-[#FFF7E8]"
              >
                <Search sx={{ color: "#6B4F1D" }} />
              </IconButton>

              <IconButton
                onClick={() => requireLoginNavigate("/wishlist")}
                className="hover:bg-[#FFF7E8]"
              >
                <Favorite sx={{ fontSize: 24, color: red[500] }} />
              </IconButton>

              <IconButton
                onClick={() => requireLoginNavigate("/cart")}
                className="relative hover:bg-[#FFF7E8]"
              >
                <AddShoppingCart sx={{ fontSize: 24, color: "#6B4F1D" }} />

                <span className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#C9A96E] text-[10px] text-white">
                  2
                </span>
              </IconButton>

              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleOpenUserMenu}
                    className="normal-case flex items-center gap-2 text-[#3B2B12]"
                  >
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        bgcolor: "#C9A96E",
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>

                    <span className="hidden font-medium lg:block">
                      {user?.fullName || "User"}
                    </span>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        minWidth: 220,
                        border: "1px solid #F2E8D7",
                      },
                    }}
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-[#3B2B12]">
                        {user?.fullName || "User"}
                      </p>

                      <p className="text-xs text-[#8B7355]">
                        {user?.email || ""}
                      </p>
                    </div>

                    <Divider sx={{ borderColor: "#F2E8D7" }} />

                    <MenuItem
                      onClick={() => {
                        navigate("/account");
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Tài khoản
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/account/orders");
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <ShoppingBag fontSize="small" />
                      </ListItemIcon>
                      Đơn hàng
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/wishlist");
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <FavoriteBorder fontSize="small" />
                      </ListItemIcon>
                      Yêu thích
                    </MenuItem>

                    <Divider sx={{ borderColor: "#F2E8D7" }} />

                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  variant="contained"
                  className="normal-case rounded-md px-3 py-1.5 text-xs lg:px-6 lg:py-2 lg:text-sm"
                >
                  Đăng nhập
                </Button>
              )}

              {isLarge && (
                <Button
                  onClick={() => navigate("/seller/login")}
                  startIcon={<Storefront />}
                  variant="outlined"
                  className="normal-case border border-[#C9A96E] px-6 py-2 text-[#B88A44]"
                >
                  Bán hàng
                </Button>
              )}
            </div>
          </div>

          {openSearch && (
            <form
              ref={searchRef}
              onSubmit={handleSearchSubmit}
              className="flex w-full items-center gap-3 border-b border-[#F2E8D7] bg-white px-4 py-4 md:px-6 lg:px-20"
            >
              <Search sx={{ color: "#B88A44" }} />

              <input
                className="flex-1 bg-transparent text-[#3B2B12] outline-none placeholder:text-[#8B7355]"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoFocus
              />
            </form>
          )}
        </div>

        {isLarge && showSheet && (
          <div
            onMouseEnter={() => {
              clearTimeout(timeoutRef.current);
              setShowSheet(true);
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setShowSheet(false);
              }, 200);
            }}
            className="categorySheet absolute left-20 right-20 top-[5.5rem] z-40"
          >
            <CategorySheet
              selectedCategory={selectedCategory}
              setShowSheet={setShowSheet}
            />
          </div>
        )}
      </Box>

      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <div className="w-[260px] space-y-3 bg-[#FFFDF8] p-4">
          <h2 className="mb-2 text-lg font-semibold text-[#3B2B12]">
            Danh mục
          </h2>

          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => handleCategoryNavigate(item.key)}
              className="cursor-pointer rounded-lg px-3 py-3 text-[#6B4F1D] hover:bg-[#FFF7E8] hover:text-[#B88A44]"
            >
              {item.name}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
