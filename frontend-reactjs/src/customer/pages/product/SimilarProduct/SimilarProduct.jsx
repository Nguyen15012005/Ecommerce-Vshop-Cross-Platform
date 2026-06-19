import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../store/productSlice";
import { useEffect } from "react";
import SimilarProductCard from "./SimilarProductCard";

// Fallback khi không có sản phẩm tương tự
const FALLBACK = [1, 2, 3, 4, 5, 6];

const SimilarProduct = ({ category, currentId }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.product);

  useEffect(() => {
    if (category) {
      dispatch(fetchProducts({ category, pageNumber: 0 }));
    }
  }, [dispatch, category]);

  // Lọc bỏ sản phẩm hiện tại
  const similar = products
    .filter((p) => String(p.id) !== String(currentId))
    .slice(0, 6);

  const displayList = similar.length > 0 ? similar : FALLBACK;

  return (
    <section className="rounded-[28px] border border-[#F2E8D7] bg-white p-5 shadow-[0_8px_30px_rgba(201,169,110,0.08)] lg:p-7">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#B88A44]">
            Related Products
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#3B2B12] lg:text-3xl">
            Sản phẩm tương tự
          </h2>
        </div>
        <button className="w-fit rounded-full border border-[#EADFCB] px-5 py-2 text-sm font-semibold text-[#B88A44] transition hover:bg-[#FFF7E8]">
          Xem thêm
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {displayList.map((item, i) => (
          <SimilarProductCard
            key={typeof item === "object" ? item.id : i}
            product={typeof item === "object" ? item : { id: item }}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarProduct;
