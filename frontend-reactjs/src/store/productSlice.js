import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// ─── Fallback data khi DB trống ───────────────────────────────────────────────
const FALLBACK_PRODUCTS = [
  // ── MEN ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Áo Thun Oversize Local Brand – Form Rộng Unisex",
    description: "Chất cotton 100%, mềm mịn, thoáng mát. Phù hợp mặc hằng ngày.",
    sellingPrice: 299000,
    mrpPrice: 399000,
    discountPercent: 25,
    images: [
      "https://images.pexels.com/photos/5868726/pexels-photo-5868726.jpeg?auto=compress&w=500",
      "https://images.pexels.com/photos/8485550/pexels-photo-8485550.jpeg?auto=compress&w=500",
    ],
    category: { name: "men" },
    seller: { businessName: "DailyZone Fashion" },
    numRatings: 120,
  },
  {
    id: 2,
    title: "Áo Khoác Denim Wash Vintage – Phong Cách Retro",
    description: "Vải denim cao cấp, wash màu tự nhiên. Phong cách retro bắt mắt.",
    sellingPrice: 549000,
    mrpPrice: 750000,
    discountPercent: 27,
    images: [
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&w=500",
    ],
    category: { name: "men" },
    seller: { businessName: "DailyZone Fashion" },
    numRatings: 98,
  },
  {
    id: 3,
    title: "Quần Jogger Cotton Slim Fit Nam",
    description: "Co giãn 4 chiều, thoáng khí. Phù hợp tập gym hoặc đi dạo.",
    sellingPrice: 369000,
    mrpPrice: 499000,
    discountPercent: 26,
    images: [
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=500",
    ],
    category: { name: "men" },
    seller: { businessName: "DailyZone Sport" },
    numRatings: 74,
  },
  {
    id: 4,
    title: "Giày Sneaker Trắng Nam – Đế Su Êm Chân",
    description: "Da PU cao cấp, đế su chống trơn. Thiết kế trắng tinh tế.",
    sellingPrice: 699000,
    mrpPrice: 950000,
    discountPercent: 26,
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=500",
    ],
    category: { name: "men" },
    seller: { businessName: "DailyZone Shoes" },
    numRatings: 215,
  },
  // ── WOMEN ─────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Váy Hoa Nhí Boho Nữ – Dáng Midi Thắt Eo",
    description: "Chất voan nhẹ, thoáng. Hoạ tiết hoa nhí dịu dàng, phù hợp dạo phố.",
    sellingPrice: 389000,
    mrpPrice: 520000,
    discountPercent: 25,
    images: [
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&w=500",
    ],
    category: { name: "women" },
    seller: { businessName: "DailyZone Fashion" },
    numRatings: 188,
  },
  {
    id: 6,
    title: "Áo Sơ Mi Linen Nữ – Nhẹ Mát Mùa Hè",
    description: "Chất linen tự nhiên, thấm hút tốt. Form suông thanh lịch.",
    sellingPrice: 329000,
    mrpPrice: 450000,
    discountPercent: 27,
    images: [
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&w=500",
    ],
    category: { name: "women" },
    seller: { businessName: "DailyZone Fashion" },
    numRatings: 143,
  },
  {
    id: 7,
    title: "Túi Xách Nữ Da PU Cao Cấp – Nhiều Ngăn",
    description: "Chất liệu da PU cao cấp, nhiều ngăn tiện lợi. Phù hợp đi làm, đi chơi.",
    sellingPrice: 450000,
    mrpPrice: 650000,
    discountPercent: 31,
    images: [
      "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500",
    ],
    category: { name: "women" },
    seller: { businessName: "DailyZone Bags" },
    numRatings: 256,
  },
  {
    id: 8,
    title: "Giày Cao Gót Block Heel Nữ – Thanh Lịch",
    description: "Đế block heel 5cm vững chắc, chất da bóng sang trọng.",
    sellingPrice: 599000,
    mrpPrice: 850000,
    discountPercent: 29,
    images: [
      "https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&w=500",
    ],
    category: { name: "women" },
    seller: { businessName: "DailyZone Shoes" },
    numRatings: 167,
  },
  // ── ELECTRONICS ────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Tai Nghe Bluetooth ANC Pro – Pin 30 Giờ",
    description: "Chống ồn chủ động, pin 30 giờ, kết nối đa điểm. Âm thanh Hi-Fi.",
    sellingPrice: 1290000,
    mrpPrice: 1890000,
    discountPercent: 32,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=500",
    ],
    category: { name: "electronics" },
    seller: { businessName: "DailyZone Tech" },
    numRatings: 312,
  },
  {
    id: 10,
    title: "Đồng Hồ Thông Minh Smartwatch – GPS & SpO2",
    description: "Màn hình AMOLED 1.4\", theo dõi sức khoẻ 24/7, chống nước IP68.",
    sellingPrice: 2490000,
    mrpPrice: 3490000,
    discountPercent: 29,
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=500",
    ],
    category: { name: "electronics" },
    seller: { businessName: "DailyZone Tech" },
    numRatings: 428,
  },
  {
    id: 11,
    title: "Loa Bluetooth Không Dây – Âm Thanh 360°",
    description: "Âm bass mạnh, chống nước IPX7, pin 20 giờ. Thiết kế compact.",
    sellingPrice: 890000,
    mrpPrice: 1290000,
    discountPercent: 31,
    images: [
      "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&w=500",
    ],
    category: { name: "electronics" },
    seller: { businessName: "DailyZone Tech" },
    numRatings: 195,
  },
  {
    id: 12,
    title: "Sạc Dự Phòng 20.000mAh PD Fast Charge",
    description: "Sạc nhanh 22.5W, 2 cổng USB-A + 1 USB-C. Siêu mỏng nhẹ.",
    sellingPrice: 590000,
    mrpPrice: 790000,
    discountPercent: 25,
    images: [
      "https://images.pexels.com/photos/4526477/pexels-photo-4526477.jpeg?auto=compress&w=500",
    ],
    category: { name: "electronics" },
    seller: { businessName: "DailyZone Tech" },
    numRatings: 289,
  },
  // ── HOME & KITCHEN ─────────────────────────────────────────────────────────
  {
    id: 13,
    title: "Bình Giữ Nhiệt Inox 500ml – Giữ Lạnh 24H",
    description: "Inox 316 nguyên chất, không BPA. Giữ lạnh 24h, giữ nóng 12h.",
    sellingPrice: 249000,
    mrpPrice: 320000,
    discountPercent: 22,
    images: [
      "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&w=500",
    ],
    category: { name: "home_furnitures" },
    seller: { businessName: "DailyZone Home" },
    numRatings: 341,
  },
  {
    id: 14,
    title: "Nồi Nấu Chậm Ceramic 3.5L – Tiết Kiệm Điện",
    description: "Gốm sứ cao cấp, lòng nồi chống dính, tiết kiệm điện.",
    sellingPrice: 890000,
    mrpPrice: 1290000,
    discountPercent: 31,
    images: [
      "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&w=500",
    ],
    category: { name: "home_furnitures" },
    seller: { businessName: "DailyZone Home" },
    numRatings: 178,
  },
  {
    id: 15,
    title: "Đèn Bàn LED Cảm Ứng Điều Chỉnh Độ Sáng",
    description: "3 chế độ ánh sáng, cổng sạc USB-C tích hợp. Bảo vệ mắt.",
    sellingPrice: 399000,
    mrpPrice: 550000,
    discountPercent: 27,
    images: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=500",
    ],
    category: { name: "home_furnitures" },
    seller: { businessName: "DailyZone Home" },
    numRatings: 224,
  },
  {
    id: 16,
    title: "Bộ Chăn Ga Gối Cotton Lạnh – 4 Món",
    description: "Cotton lạnh cao cấp, thoáng mát mùa hè, mềm mịn dễ chịu.",
    sellingPrice: 750000,
    mrpPrice: 1050000,
    discountPercent: 29,
    images: [
      "https://images.pexels.com/photos/1267300/pexels-photo-1267300.jpeg?auto=compress&w=500",
    ],
    category: { name: "home_furnitures" },
    seller: { businessName: "DailyZone Home" },
    numRatings: 156,
  },
];

const FALLBACK_PRODUCT = {
  id: 1,
  title: "Áo thun cotton cao cấp",
  description: "Áo thun cotton cao cấp, form chuẩn, co giãn tốt. Phù hợp đi học, đi làm hoặc đi chơi.",
  sellingPrice: 199000,
  mrpPrice: 299000,
  discountPercent: 33,
  numRatings: 358,
  images: [
    "https://images.pexels.com/photos/8485551/pexels-photo-8485551.jpeg",
    "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
    "https://images.pexels.com/photos/9558583/pexels-photo-9558583.jpeg",
    "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
  ],
  category: { name: "men" },
  seller: { businessName: "DailyZone Fashion" },
};

const getFallbackProductById = (productId) => {
  const id = Number(productId);
  return FALLBACK_PRODUCTS.find((product) => Number(product.id) === id) || null;
};

const applyFallbackFilters = (products, params = {}) => {
  const query = params.query?.toLowerCase();
  const category = params.category?.toLowerCase();
  const color = params.colors?.toLowerCase();
  const minPrice = params.minPrice ? Number(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;
  const minDiscount = params.minDiscount ? Number(params.minDiscount) : null;

  let result = products.filter((product) => {
    const matchesQuery =
      !query ||
      product.title?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.category?.name?.toLowerCase().includes(query);
    const matchesCategory =
      !category || product.category?.name?.toLowerCase() === category;
    const matchesColor = !color || product.color?.toLowerCase() === color;
    const matchesMinPrice =
      minPrice === null || Number(product.sellingPrice) >= minPrice;
    const matchesMaxPrice =
      maxPrice === null || Number(product.sellingPrice) <= maxPrice;
    const matchesDiscount =
      minDiscount === null || Number(product.discountPercent) >= minDiscount;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesColor &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesDiscount
    );
  });

  if (params.sort === "price_low") {
    result = [...result].sort((a, b) => a.sellingPrice - b.sellingPrice);
  } else if (params.sort === "price_high") {
    result = [...result].sort((a, b) => b.sellingPrice - a.sellingPrice);
  }

  return result;
};

// ─── Thunks ────────────────────────────────────────────────────────────────────

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, { params });
      return { data: response.data, params };
    } catch (error) {
      return rejectWithValue({ message: error.response?.data?.message || "Không thể tải sản phẩm.", params });
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không tìm thấy sản phẩm.");
    }
  }
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Tìm kiếm thất bại.");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────────

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],       // mảng sản phẩm trong trang list
    totalPages: 1,
    currentPage: 0,
    productDetail: null,
    searchResults: [],
    loading: false,
    detailLoading: false,
    searchLoading: false,
    error: null,
  },
  reducers: {
    clearProductDetail(state) {
      state.productDetail = null;
      state.error = null;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { data, params } = action.payload;
        // Spring Page object: { content: [], totalPages, number }
        const content = data?.content ?? data;
        if (Array.isArray(content) && content.length > 0) {
          state.products = content;
        } else {
          state.products = applyFallbackFilters(FALLBACK_PRODUCTS, params);
        }
        state.totalPages = data?.totalPages ?? 1;
        state.currentPage = data?.number ?? 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = applyFallbackFilters(FALLBACK_PRODUCTS, action.payload?.params);
        state.totalPages = 1;
        state.currentPage = 0;
      });

    // fetchProductById
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.productDetail =
          action.payload ?? getFallbackProductById(action.meta.arg);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.productDetail = getFallbackProductById(action.meta.arg);
        state.error = state.productDetail
          ? null
          : action.payload || "Không tìm thấy sản phẩm.";
      });

    // searchProducts
    builder
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload ?? [];
      })
      .addCase(searchProducts.rejected, (state) => {
        state.searchLoading = false;
        state.searchResults = [];
      });
  },
});

export const { clearProductDetail, clearSearchResults } = productSlice.actions;
export default productSlice.reducer;
