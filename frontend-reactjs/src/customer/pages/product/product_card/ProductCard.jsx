import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Alert, IconButton, Button, Snackbar } from "@mui/material";
import { Favorite, ModeComment, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../../../store/wishlistSlice";
import { addToCart, fetchCart } from "../../../../store/cartSlice";

// ảnh fallback khi sản phẩm không có ảnh
const FALLBACK_IMAGES = [
  "https://images.pexels.com/photos/8485550/pexels-photo-8485550.jpeg",
  "https://images.pexels.com/photos/8485551/pexels-photo-8485551.jpeg",
  "https://images.pexels.com/photos/26425581/pexels-photo-26425581.jpeg",
];

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { addLoading } = useSelector((state) => state.cart);

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState("");

  const productId = product?.id || 1;

  // Lấy mảng ảnh từ sản phẩm thật, fallback nếu không có
  const images =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : FALLBACK_IMAGES;

  const discountPercent =
    product?.discountPercent ||
    (product?.mrpPrice && product?.sellingPrice
      ? Math.round(
          ((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100
        )
      : 25);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const goToDetail = () => navigate(`/product-detail/${productId}`);
  const isWishlisted = wishlist?.products?.some((item) => item.id === productId);

  const requireLogin = () => {
    if (!isAuthenticated || !localStorage.getItem("jwt")) {
      navigate("/login");
      return false;
    }

    if (role && role !== "CUSTOMER") {
      setMessage("Vui lòng đăng nhập bằng tài khoản khách hàng để mua sản phẩm.");
      return false;
    }

    return true;
  };

  const handleWishlist = async (event) => {
    event.stopPropagation();
    if (!requireLogin()) return;
    const result = await dispatch(addToWishlist(productId));
    if (addToWishlist.rejected.match(result)) {
      setMessage(result.payload || "Không thể thêm sản phẩm vào yêu thích.");
    }
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    if (!requireLogin()) return;

    const result = await dispatch(
      addToCart({ productId, size: "FREE", quantity: 1 }),
    );

    if (addToCart.fulfilled.match(result)) {
      dispatch(fetchCart());
      navigate("/cart");
    } else {
      setMessage(result.payload || "Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  const formatPrice = (price) =>
    price ? price.toLocaleString("vi-VN") + "₫" : "—";

  return (
    <div className="product-card" onClick={goToDetail}>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={(event) => {
          event?.stopPropagation?.();
          setMessage("");
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setMessage("")}>
          {message}
        </Alert>
      </Snackbar>

      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
      >
        <div className="card-image">
          {discountPercent > 0 && (
            <span className="badge">-{discountPercent}%</span>
          )}

          {images.map((item, index) => (
            <img
              key={index}
              className="card-media"
              src={item}
              alt={product?.title || "Sản phẩm"}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))}

          <div className="overlay" />

          <div className="actions">
            <IconButton
              onClick={handleWishlist}
              className="icon-btn favorite"
              sx={{ color: isWishlisted ? "#e11d48" : undefined }}
            >
              <Favorite />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                goToDetail();
              }}
              className="icon-btn comment"
            >
              <ModeComment />
            </IconButton>
          </div>

          {images.length > 1 && (
            <div className="indicator">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentImage ? "active" : ""}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="info">
          <h3 className="title line-clamp-2">
            {product?.title || "Áo Thun Local Brand Form Rộng Unisex"}
          </h3>

          <p className="desc line-clamp-2">
            {product?.description ||
              "Chất cotton 100%, mềm mịn, thoáng mát. Phù hợp mặc hằng ngày."}
          </p>

          <div className="price">
            <span className="new">
              {formatPrice(product?.sellingPrice || 299000)}
            </span>
            {product?.mrpPrice && product.mrpPrice !== product.sellingPrice && (
              <span className="old">{formatPrice(product.mrpPrice)}</span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<ShoppingCart />}
            fullWidth
            className="add-btn"
            disabled={addLoading}
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
