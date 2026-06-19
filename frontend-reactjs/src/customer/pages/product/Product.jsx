import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
} from "@mui/material";
import ProductCard from "./product_card/ProductCard";
import FilterSection from "./filter_product/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/productSlice";
import { fetchWishlist } from "../../../store/wishlistSlice";
import { useSearchParams } from "react-router-dom";

const parsePriceRange = (value) => {
  if (!value) return {};
  if (value.endsWith("+")) {
    return { minPrice: value.replace("+", "") };
  }

  const [minPrice, maxPrice] = value.split("-");
  return {
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
  };
};

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { products, totalPages, loading } = useSelector((s) => s.product);

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const priceRange = parsePriceRange(searchParams.get("price"));
    const params = {
      query: searchParams.get("query") || undefined,
      category: searchParams.get("category") || undefined,
      brand: searchParams.get("brand") || undefined,
      colors: searchParams.get("color") || undefined,
      sizes: searchParams.get("sizes") || undefined,
      minPrice: searchParams.get("minPrice") || priceRange.minPrice,
      maxPrice: searchParams.get("maxPrice") || priceRange.maxPrice,
      minDiscount: searchParams.get("discount") || undefined,
      sort: sort || undefined,
      stock: searchParams.get("stock") || undefined,
      pageNumber: page - 1,
    };

    dispatch(fetchProducts(params));
  }, [dispatch, searchParams, sort, page]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchWishlist());
    }
  }, [dispatch]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10">
      {/* HERO */}
      <section className="relative mb-5 overflow-hidden px-3 lg:px-10">
        <img
          className="h-[220px] w-full rounded-lg object-cover sm:h-[260px] lg:h-[400px]"
          src="/assets/image/men_hero.jpg"
          alt=""
        />

        <div className="absolute inset-0 rounded-lg bg-black/20 lg:bg-transparent"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[90%] px-4 text-left text-gray-700 sm:px-6 lg:ml-16 lg:max-w-[500px] lg:text-[#123467]">
            <p className="text-[10px] uppercase tracking-widest opacity-80 sm:text-xs lg:text-base lg:text-gray-500">
              New Collection
            </p>

            <h2 className="mt-1 text-xl font-bold leading-tight sm:text-2xl lg:text-6xl">
              {searchParams.get("category")
                ? searchParams.get("category").toUpperCase()
                : "Tất cả sản phẩm"}
            </h2>

            <p className="mt-2 text-xs opacity-90 sm:text-sm lg:text-base lg:text-gray-600">
              Khám phá những thiết kế mới nhất dành cho bạn.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="gap-6 px-4 lg:flex lg:px-10">
        {/* FILTER DESKTOP */}
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSection />
          </div>
        </aside>

        {/* PRODUCT AREA */}
        <div className="flex-1 space-y-5">
          {/* MOBILE TOPBAR */}
          <div className="sticky top-0 z-30 flex items-center justify-between bg-white px-2 py-4 lg:hidden">
            <FilterSection />

            <FormControl size="small" sx={{ width: "160px" }}>
              <InputLabel>Sắp Xếp</InputLabel>

              <Select value={sort} label="Sắp Xếp" onChange={handleSortChange}>
                <MenuItem value="">Mặc định</MenuItem>

                <MenuItem value="price_low">Giá: Thấp → Cao</MenuItem>

                <MenuItem value="price_high">Giá: Cao → Thấp</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* DESKTOP SORT */}
          <div className="hidden items-center justify-end px-2 lg:flex lg:px-0">
            <FormControl size="small" sx={{ width: "180px" }}>
              <InputLabel>Sắp Xếp</InputLabel>

              <Select value={sort} label="Sắp Xếp" onChange={handleSortChange}>
                <MenuItem value="">Mặc định</MenuItem>

                <MenuItem value="price_low">Giá: Thấp → Cao</MenuItem>

                <MenuItem value="price_high">Giá: Cao → Thấp</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          {/* LOADING */}
          {loading ? (
            <div className="flex justify-center py-20">
              <CircularProgress sx={{ color: "#C9A96E" }} />
            </div>
          ) : (
            /* PRODUCT GRID */
            <section className="grid grid-cols-1 items-stretch gap-5 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-1">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </section>
          )}

          {/* PAGINATION */}
          <div className="mt-10 flex justify-center pt-10">
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages || 1}
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
