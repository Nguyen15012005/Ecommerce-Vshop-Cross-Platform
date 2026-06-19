import React from "react";
import CategoryGrid from "./category_grid/CategoryGrid";
import Deal from "./deal/Deal";
import ElectricCategory from "./electric_category/ElectricCategory";
import ShopByCategory from "./shop_by_category/ShopByCategory";
import { Storefront } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleBecomeSeller = () => {
    if (isAuthenticated && role === "SELLER") {
      navigate("/seller");
    } else {
      navigate("/seller/register");
    }
  };

  return (
    <div>
      {/* CATEGORY QUICK */}
      <section>{/* <ElectricCategory /> */}</section>

      {/* TREND GRID */}
      <section>
        <CategoryGrid />
      </section>

      {/* DEAL */}
      <section>
        <Deal />
      </section>

      {/* SHOP BY CATEGORY */}
      <section>
        <ShopByCategory />
      </section>

      <section className="relative pt-20">
        <img
          className="h-full w-full object-cover"
          src="/assets/image/become_seller-new.png"
          alt=""
        />

        {/* BUTTON */}
        <div className="absolute bottom-14 left-2 lg:left-[4rem]">
          <Button
            onClick={handleBecomeSeller}
            startIcon={<Storefront />}
            variant="contained"
            className="
              normal-case
              rounded-none
              border border-black
              bg-black
              px-8 py-3
              tracking-wider
              text-white
              shadow-none
              transition-all duration-300

              hover:border-[#C6A15B]
              hover:bg-transparent
              hover:text-[#C6A15B]
            "
          >
            Bắt đầu bán hàng
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
