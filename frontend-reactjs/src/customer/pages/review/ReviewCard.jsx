import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../../store/reviewSlice";

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.user);

  // Fallback data nếu review null (dùng trong ProductDetail preview)
  const reviewText =
    review?.reviewText || "Sản phẩm chất lượng tốt, mẫu mã đẹp.";
  const reviewRating = review?.reviewRating ?? review?.rating ?? 4.5;
  const userName = review?.user?.fullName || "Khách hàng";
  const images = review?.productImages || [];

  const isOwner = profile && review?.user?.email === profile?.email;

  const handleDelete = () => {
    if (review?.id) dispatch(deleteReview(review.id));
  };

  // Format ngày
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Hôm nay";
    if (diff === 1) return "Hôm qua";
    if (diff < 30) return `${diff} ngày trước`;
    return d.toLocaleDateString("vi-VN");
  };

  return (
    <div className="flex justify-between">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{
                width: { xs: 40, sm: 48, lg: 56 },
                height: { xs: 40, sm: 48, lg: 56 },
                bgcolor: "#9155FD",
                fontSize: { xs: 14, sm: 16, lg: 20 },
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="text-lg font-semibold">{userName}</p>
              <p className="opacity-70">{formatDate(review?.createdAt)}</p>
            </div>

            <div>
              <Rating
                readOnly
                value={reviewRating}
                name="half-rating"
                precision={0.5}
              />
            </div>

            <p>{reviewText}</p>

            {images.length > 0 && (
              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <img
                    key={i}
                    className="h-24 w-24 flex-shrink-0 cursor-pointer rounded-md object-cover transition duration-300 hover:scale-105"
                    src={img}
                    alt={`review-img-${i}`}
                  />
                ))}
              </div>
            )}
          </div>
        </Grid>
      </Grid>

      {isOwner && (
        <div>
          <IconButton onClick={handleDelete}>
            <MdDelete className="text-red-500 hover:text-red-700" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
