import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, CircularProgress, IconButton, Snackbar } from "@mui/material";
import { Favorite, ShoppingCart, DeleteOutline, ArrowBack } from "@mui/icons-material";
import { addToWishlist, fetchWishlist } from "../../../store/wishlistSlice";
import { addToCart, fetchCart } from "../../../store/cartSlice";

// ─── Dữ liệu mặc định hiển thị khi backend chưa có sản phẩm ────────────────
const DEFAULT_WISHLIST_PRODUCTS = [
  {
    id: 1,
    title: "Áo Thun Oversize Local Brand – Form Rộng Unisex",
    description: "Chất cotton 100%, mềm mịn, thoáng mát. Thiết kế tối giản, phù hợp mọi phong cách.",
    sellingPrice: 299000,
    mrpPrice: 399000,
    images: [
      "https://images.pexels.com/photos/5868726/pexels-photo-5868726.jpeg?auto=compress&w=600",
    ],
    category: { name: "Thời trang Nam" },
  },
  {
    id: 2,
    title: "Áo Khoác Denim Wash Vintage Unisex",
    description: "Vải denim cao cấp, wash màu tự nhiên. Phong cách retro bắt mắt, dễ phối đồ.",
    sellingPrice: 549000,
    mrpPrice: 750000,
    images: [
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&w=600",
    ],
    category: { name: "Thời trang Nam" },
  },
  {
    id: 3,
    title: "Váy Hoa Nhí Boho Nữ – Dáng Midi Thắt Eo",
    description: "Chất voan nhẹ, thoáng. Hoạ tiết hoa nhí dịu dàng, phù hợp dạo phố hay đi biển.",
    sellingPrice: 389000,
    mrpPrice: 520000,
    images: [
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&w=600",
    ],
    category: { name: "Thời trang Nữ" },
  },
  {
    id: 4,
    title: "Giày Sneaker Trắng Nam Nữ – Đế Su Êm Chân",
    description: "Da PU cao cấp, đế su chống trơn. Thiết kế trắng tinh tế, dễ phối với nhiều trang phục.",
    sellingPrice: 699000,
    mrpPrice: 950000,
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=600",
    ],
    category: { name: "Giày dép" },
  },
  {
    id: 5,
    title: "Tai Nghe Không Dây Bluetooth ANC Pro",
    description: "Chống ồn chủ động, pin 30 giờ, kết nối đa điểm. Âm thanh Hi-Fi sống động.",
    sellingPrice: 1290000,
    mrpPrice: 1890000,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=600",
    ],
    category: { name: "Điện tử" },
  },
  {
    id: 6,
    title: "Bình Giữ Nhiệt Inox 500ml – Giữ Lạnh 24H",
    description: "Inox 316 nguyên chất, không BPA. Giữ lạnh 24h, giữ nóng 12h. Thiết kế tối giản sang trọng.",
    sellingPrice: 249000,
    mrpPrice: 320000,
    images: [
      "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&w=600",
    ],
    category: { name: "Gia dụng" },
  },
];

// ─── Component WishlistCard ──────────────────────────────────────────────────
const WishlistCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [message, setMessage] = React.useState("");

  const discountPercent =
    product?.mrpPrice && product?.sellingPrice
      ? Math.round(((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100)
      : 0;

  const formatPrice = (price) =>
    price ? price.toLocaleString("vi-VN") + "đ" : "—";

  const image =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : "https://images.pexels.com/photos/5868726/pexels-photo-5868726.jpeg?auto=compress&w=600";

  const canUseCustomerActions = () => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return false;
    }

    if (role && role !== "CUSTOMER") {
      setMessage("Vui lòng đăng nhập bằng tài khoản khách hàng để mua sản phẩm.");
      return false;
    }

    return true;
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-[#F2E8D7] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,169,110,0.18)]"
    >
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setMessage("")}>
          {message}
        </Alert>
      </Snackbar>

      {/* Badge giảm giá */}
      {discountPercent > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-[#D6B57A] to-[#B88A44] px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
          -{discountPercent}%
        </span>
      )}

      {/* Nút xoá khỏi wishlist */}
      <IconButton
        size="small"
        onClick={async () => {
          if (!canUseCustomerActions()) return;
          const result = await dispatch(addToWishlist(product.id));
          if (addToWishlist.rejected.match(result)) {
            setMessage(result.payload || "Không thể cập nhật danh sách yêu thích.");
          }
        }}
        className="absolute right-2 top-2 z-10"
        sx={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          "&:hover": { background: "#fff5f5", color: "#ef4444" },
        }}
      >
        <DeleteOutline sx={{ fontSize: 18, color: "#aaa" }} />
      </IconButton>

      {/* Ảnh sản phẩm */}
      <div
        className="relative h-[220px] cursor-pointer overflow-hidden bg-[#FAF8F3]"
        onClick={() => navigate(`/product-detail/${product.id}`)}
      >
        <img
          src={image}
          alt={product?.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Thông tin */}
      <div className="p-4">
        {product?.category?.name && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#B88A44]">
            {product.category.name}
          </p>
        )}

        <h3
          onClick={() => navigate(`/product-detail/${product.id}`)}
          className="mb-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-[#3B2B12] hover:text-[#B88A44] transition-colors duration-200"
        >
          {product?.title}
        </h3>

        <p className="mb-3 line-clamp-1 text-xs text-[#8B7355]">
          {product?.description}
        </p>

        {/* Giá */}
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#C9402B]">
            {formatPrice(product?.sellingPrice)}
          </span>
          {product?.mrpPrice && product.mrpPrice !== product.sellingPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product?.mrpPrice)}
            </span>
          )}
        </div>

        {/* Nút thêm vào giỏ */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart sx={{ fontSize: 16 }} />}
          onClick={async () => {
            if (!canUseCustomerActions()) return;
            const result = await dispatch(
              addToCart({ productId: product.id, size: "FREE", quantity: 1 }),
            );

            if (addToCart.fulfilled.match(result)) {
              dispatch(fetchCart());
              navigate("/cart");
            } else {
              setMessage(result.payload || "Không thể thêm sản phẩm vào giỏ hàng.");
            }
          }}
          sx={{
            background: "linear-gradient(135deg, #D6B57A 0%, #B88A44 100%)",
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 600,
            py: "8px",
            boxShadow: "0 4px 14px rgba(201,169,110,0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #C9A96E 0%, #A07830 100%)",
              boxShadow: "0 6px 20px rgba(201,169,110,0.45)",
            },
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

// ─── Component chính Wishlist ────────────────────────────────────────────────
const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist, loading } = useSelector((s) => s.wishlist);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchWishlist());
    }
  }, [dispatch]);

  const apiProducts = wishlist?.products || [];
  const displayProducts = localStorage.getItem("jwt")
    ? apiProducts
    : DEFAULT_WISHLIST_PRODUCTS;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress sx={{ color: "#C9A96E" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-5 py-10 sm:px-10 md:px-20 lg:px-28">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-2 flex items-center gap-1 text-sm text-[#8B7355] hover:text-[#B88A44] transition-colors"
          >
            <ArrowBack sx={{ fontSize: 16 }} />
            Quay lại
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6B57A] to-[#B88A44] shadow-md">
              <Favorite sx={{ fontSize: 20, color: "#fff" }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#3B2B12]">
                Danh sách yêu thích
              </h1>
              <p className="text-sm text-[#8B7355]">
                {displayProducts.length} sản phẩm
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/product-list")}
          variant="outlined"
          sx={{
            borderColor: "#C9A96E",
            color: "#B88A44",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { borderColor: "#B88A44", background: "#FFF7E8" },
          }}
        >
          Tiếp tục mua sắm
        </Button>
      </div>

      {/* GRID SẢN PHẨM */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {displayProducts.map((product) => (
          <WishlistCard key={product.id} product={product} />
        ))}
      </div>

      {/* BANNER GỢI Ý */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-[#F2E8D7] bg-gradient-to-r from-[#FFFDF5] via-[#FFF7E8] to-[#FFFDF5] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B88A44]">
              Ưu đãi đặc biệt
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#3B2B12]">
              Mua ngay hôm nay – Miễn phí vận chuyển đơn từ 500.000đ
            </h2>
            <p className="mt-1 text-sm text-[#8B7355]">
              Đừng để sản phẩm yêu thích hết hàng, đặt hàng ngay hôm nay!
            </p>
          </div>
          <Button
            onClick={() => navigate("/cart")}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #D6B57A 0%, #B88A44 100%)",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: 4,
              py: 1.5,
              whiteSpace: "nowrap",
              boxShadow: "0 6px 20px rgba(201,169,110,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #C9A96E 0%, #A07830 100%)",
              },
            }}
          >
            Xem giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
