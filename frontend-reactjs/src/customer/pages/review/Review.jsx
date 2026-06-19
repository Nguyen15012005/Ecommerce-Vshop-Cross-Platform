import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { CircularProgress, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../../store/reviewSlice";
import { fetchProductById } from "../../../store/productSlice";

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { reviews, loading } = useSelector((s) => s.review);
  const { productDetail } = useSelector((s) => s.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const product = productDetail;
  const mainImage =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : "https://cdn.prod.website-files.com/622488277ab5ee818d179d9f/6851ef68b64528a9ee3e9af3_6633f57bd5f74992577ce526_pasted_image_0-5.webp";

  return (
    <div className="flex flex-col gap-10 bg-gray-50 p-5 lg:flex-row lg:p-15">
      {/* LEFT - sản phẩm */}
      <section
        onClick={() => navigate(`/product-detail/${productId || 1}`)}
        className="w-full cursor-pointer space-y-4 rounded-xl bg-white p-4 shadow-sm md:w-1/2 lg:w-[30%]"
      >
        <img
          className="h-[280px] w-full rounded-lg object-cover"
          src={mainImage}
          alt={product?.title || "Sản phẩm"}
        />

        <div className="space-y-1">
          <p className="text-lg font-semibold">
            {product?.title || "Camera SamSung"}
          </p>
          <p className="text-sm text-gray-500">
            {product?.description || "High-quality camera for professional photography"}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-bold text-red-500">
            {product?.sellingPrice
              ? product.sellingPrice.toLocaleString("vi-VN") + " VNĐ"
              : "999.999 VNĐ"}
          </span>
          {product?.mrpPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.mrpPrice.toLocaleString("vi-VN")} VNĐ
            </span>
          )}
          {product?.discountPercent && (
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-600">
              -{product.discountPercent}%
            </span>
          )}
        </div>
      </section>

      {/* RIGHT - danh sách reviews */}
      <section className="w-full rounded-xl bg-white p-5 shadow-sm md:w-1/2 lg:w-[70%]">
        <h1 className="border-b pb-4 text-2xl font-semibold">
          Đánh giá & Xếp hạng
          {reviews.length > 0 && (
            <span className="ml-2 text-base font-normal text-gray-400">
              ({reviews.length} đánh giá)
            </span>
          )}
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <CircularProgress sx={{ color: "#C9A96E" }} />
          </div>
        ) : (
          <div className="scrollbar-hide flex max-h-[500px] flex-col gap-3 overflow-y-auto">
            {reviews.map((review, i) => (
              <div key={review.id || i} className="space-y-4">
                <ReviewCard review={review} />
                {i !== reviews.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Review;
