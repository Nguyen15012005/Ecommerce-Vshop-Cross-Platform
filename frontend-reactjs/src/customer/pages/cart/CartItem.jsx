import { Button, Divider, IconButton } from "@mui/material";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { MdRemoveCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../store/cartSlice";

const FALLBACK_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // item từ backend: { id, product: { title, images, seller }, quantity, size, sellingPrice, mrpPrice }
  const product = item?.product || {};
  const quantity = item?.quantity || 1;
  const lineSellingPrice = item?.sellingPrice || product?.sellingPrice * quantity || 0;
  const lineMrpPrice = item?.mrpPrice || product?.mrpPrice * quantity || 0;
  const image =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : FALLBACK_IMAGE;

  const handleIncrease = () => {
    dispatch(updateCartItem({ cartItemId: item.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(updateCartItem({ cartItemId: item.id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeCartItem(item.id));
  };

  const formatPrice = (price) =>
    price ? price.toLocaleString("vi-VN") + "đ" : "—";

  return (
    <div className="relative rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      {/* CONTENT */}
      <div className="flex gap-4 p-4">
        {/* IMAGE */}
        <div>
          <img
            className="h-[110px] w-[90px] rounded-lg object-cover"
            src={image}
            alt={product?.title || "Sản phẩm"}
          />
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-1">
          <h1 className="line-clamp-2 text-base font-semibold text-gray-800">
            {product?.title || "Tên sản phẩm"}
          </h1>

          <p className="line-clamp-1 text-sm text-gray-600">
            {product?.description || ""}
          </p>

          <p className="text-xs text-gray-400">
            <strong>Người bán:</strong>{" "}
            {product?.seller?.businessName || "DailyZone Store"}
          </p>

          {item?.size && item.size !== "FREE" && (
            <p className="text-xs text-gray-500">
              <strong>Size:</strong> {item.size}
            </p>
          )}

          <p className="text-xs font-medium text-green-600">
            7 ngày đổi trả miễn phí
          </p>

          <p className="text-xs text-gray-500">
            <strong>Số lượng:</strong> {quantity}
          </p>
        </div>
      </div>

      <Divider />

      {/* ACTION */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* QUANTITY */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-2 py-1">
          <Button size="small" onClick={handleDecrease}>
            <MdRemoveCircle
              className={`${quantity === 1 ? "text-gray-300" : "text-red-600"}`}
            />
          </Button>
          <span className="px-2 font-semibold text-gray-800">{quantity}</span>
          <Button size="small" onClick={handleIncrease}>
            <IoMdAddCircle className="text-teal-600" />
          </Button>
        </div>

        {/* PRICE */}
        <div>
          <p className="text-base font-semibold text-red-500">
            {formatPrice(lineSellingPrice)}
          </p>
          {lineMrpPrice && lineMrpPrice !== lineSellingPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(lineMrpPrice)}
            </p>
          )}
        </div>
      </div>

      {/* REMOVE */}
      <div className="absolute right-2 top-2">
        <IconButton
          size="small"
          onClick={handleRemove}
          sx={{
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            "&:hover": { background: "#f5f5f5" },
          }}
        >
          <AiFillCloseCircle className="text-gray-500 hover:text-red-500" />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
