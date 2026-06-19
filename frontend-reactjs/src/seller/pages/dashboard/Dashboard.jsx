import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  AttachMoney,
  ShoppingBagOutlined,
  PeopleOutline,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import TopBar from "../../components/navbar/TopBar";
import RevenueChart from "./components/RevenueChart";
import CategoryChart from "./components/CategoryChart";
import ConversionChart from "./components/ConversionChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerOrders,
  fetchSellerProducts,
  fetchSellerReport,
} from "../../../store/sellerSlice";

const StatCard = ({ title, value, percentage, isUp, icon, sideColor }) => (
  <Card
    sx={{
      borderRadius: "28px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
      border: "1px solid #EAEAEA",
      bgcolor: "#fff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 4,
        height: "100%",
        bgcolor: sideColor || "#C9A96E",
      }}
    />
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ fontWeight: 600, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.5px" }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            bgcolor: isUp
              ? "rgba(46, 204, 113, 0.1)"
              : "rgba(231, 76, 60, 0.1)",
            p: 0.5,
            borderRadius: "50%",
            display: "flex",
          }}
        >
          {React.cloneElement(icon, {
            sx: { fontSize: 18, color: isUp ? "#2ecc71" : "#e74c3c" },
          })}
        </Box>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#111" }}>
        {value}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: isUp ? "#2ecc71" : "#e74c3c",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isUp ? (
            <ArrowUpward sx={{ fontSize: 12 }} />
          ) : (
            <ArrowDownward sx={{ fontSize: 12 }} />
          )}
          {percentage}%
        </Typography>
        <Typography variant="caption" color="textSecondary">
          so với tuần trước
        </Typography>
      </Box>
    </Box>
  </Card>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { report, products, orders } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(fetchSellerReport());
    dispatch(fetchSellerProducts());
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const formatVnd = (value) =>
    `${Number(value || 0).toLocaleString("vi-VN")}đ`;
  const pendingOrders = orders.filter((order) => order.orderStatus === "PENDING").length;
  const completedPercent =
    orders.length > 0
      ? Math.round(((orders.length - pendingOrders) / orders.length) * 100)
      : 0;

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pb: 5 }}>
      <TopBar hideSearch={true} />

      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* LEFT & MIDDLE COLUMN */}
          <Grid item xs={12} lg={9}>
            <Grid container spacing={3}>
              {/* Stats Row */}
              <Grid item xs={12} md={4}>
                <StatCard
                  title="Tổng doanh thu"
                  value={formatVnd(report?.totalEarnings)}
                  percentage="3.34"
                  isUp={true}
                  icon={<AttachMoney />}
                  sideColor="#C9A96E"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard
                  title="Tổng đơn hàng"
                  value={report?.totalOrders ?? orders.length}
                  percentage="2.89"
                  isUp={false}
                  icon={<ShoppingBagOutlined />}
                  sideColor="#2C3E50"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard
                  title="Sản phẩm"
                  value={products.length}
                  percentage="8.02"
                  isUp={true}
                  icon={<PeopleOutline />}
                  sideColor="#27AE60"
                />
              </Grid>

              {/* Main Charts Row */}
              <Grid item xs={12} md={8}>
                <RevenueChart />
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    p: 3,
                    height: "100%",
                    border: "1px solid #F0F0F0",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Mục tiêu tháng
                  </Typography>
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800, color: "#C9A96E" }}
                    >
                      {completedPercent}%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tiến độ rất tốt! 🎉
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={completedPercent}
                      sx={{
                        mt: 3,
                        height: 10,
                        borderRadius: 5,
                        bgcolor: "#F0F0F0",
                        "& .MuiLinearProgress-bar": { bgcolor: "#C9A96E" },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 4,
                      bgcolor: "#FFF2E6",
                      p: 2,
                      borderRadius: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Mục tiêu
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {orders.length}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="caption" color="textSecondary">
                        Thực đạt
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#C9A96E" }}
                      >
                        {orders.length - pendingOrders}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              {/* Bottom Row */}
              <Grid item xs={12} md={6}>
                <ConversionChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    p: 3,
                    border: "1px solid #F0F0F0",
                    boxShadow: "none",
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Người dùng tích cực
                  </Typography>
                  <Box sx={{ mt: 1.5 }}>
                    {[
                      { country: "Việt Nam", value: 36, color: "#C9A96E" },
                      { country: "Hoa Kỳ", value: 24, color: "#FFB84D" },
                      { country: "Nhật Bản", value: 17.5, color: "#FFE0B3" },
                      { country: "Hàn Quốc", value: 15, color: "#FFF2E6" },
                      { country: "Khác", value: 7.5, color: "#F0F0F0" },
                    ].map((item) => (
                      <Box key={item.country} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {item.country}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 700 }}
                          >
                            {item.value}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={item.value}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#F5F5F5",
                            "& .MuiLinearProgress-bar": { bgcolor: item.color },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      mt: "auto",
                      pt: 1.5,
                      borderTop: "1px solid #F5F5F5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Đang trực tuyến
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 800, color: "#2ecc71" }}
                      >
                        1.284 người
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#C9A96E",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Xem bản đồ
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} lg={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CategoryChart />
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    p: 3,
                    border: "1px solid #F0F0F0",
                    boxShadow: "none",
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Nguồn truy cập
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      mt: 1,
                    }}
                  >
                    {[
                      { name: "Trực tiếp", value: 40 },
                      { name: "Tìm kiếm", value: 25 },
                      { name: "Mạng xã hội", value: 15 },
                      { name: "Quảng cáo FB", value: 10 },
                      { name: "Quảng cáo GG", value: 8 },
                      { name: "Khác", value: 2 },
                    ].map((source) => (
                      <Box key={source.name}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="caption">
                            {source.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 700 }}
                          >
                            {source.value}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={source.value}
                          sx={{
                            height: 5,
                            borderRadius: 3,
                            bgcolor: "#F0F0F0",
                            "& .MuiLinearProgress-bar": { bgcolor: "#C9A96E" },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      mt: "auto",
                      pt: 1.5,
                      borderTop: "1px solid #F5F5F5",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Tỉ lệ thoát
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        24.8%
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="caption" color="textSecondary">
                        Thời gian TB
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        4p 32s
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
