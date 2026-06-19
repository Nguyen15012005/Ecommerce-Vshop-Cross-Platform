import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  MenuItem,
  Select,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Avatar,
} from "@mui/material";
import { Download, DateRange, Inventory2Outlined } from "@mui/icons-material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import TopBar from "../../components/navbar/TopBar";

// --- HELPER ĐỊNH DẠNG SỐ AN TOÀN ---
const formatVND = (value) => {
  if (value === undefined || value === null) return "₫0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  return `₫${num.toLocaleString("vi-VN")}`;
};

const formatShort = (value) => {
  if (value === undefined || value === null) return "0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
  return num.toString();
};

const formatNumber = (value) => {
  if (value === undefined || value === null) return "0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  return num.toLocaleString("vi-VN");
};

// --- DỮ LIỆU MẪU ĐỘNG ---
const getDataByRange = (range) => {
  const getWeeklyStatus = (base) => [
    {
      name: "T2",
      "Thành công": base * 0.8,
      "Đã hủy": base * 0.1,
      "Trả hàng": base * 0.05,
    },
    {
      name: "T3",
      "Thành công": base * 0.6,
      "Đã hủy": base * 0.05,
      "Trả hàng": base * 0.02,
    },
    {
      name: "T4",
      "Thành công": base * 0.9,
      "Đã hủy": base * 0.12,
      "Trả hàng": base * 0.04,
    },
    {
      name: "T5",
      "Thành công": base * 1.1,
      "Đã hủy": base * 0.08,
      "Trả hàng": base * 0.03,
    },
    {
      name: "T6",
      "Thành công": base * 1.3,
      "Đã hủy": base * 0.06,
      "Trả hàng": base * 0.02,
    },
    {
      name: "T7",
      "Thành công": base * 1.8,
      "Đã hủy": base * 0.2,
      "Trả hàng": base * 0.1,
    },
    {
      name: "CN",
      "Thành công": base * 1.5,
      "Đã hủy": base * 0.15,
      "Trả hàng": base * 0.08,
    },
  ];

  const ranges = {
    today: {
      metrics: [
        {
          title: "Doanh thu thuần",
          value: "45.2M",
          trend: "+5.2%",
          isUp: true,
          color: "#C9A96E",
        },
        {
          title: "Tổng đơn hàng",
          value: "142",
          trend: "+12.5%",
          isUp: true,
          color: "#2C3E50",
        },
        {
          title: "Lợi nhuận dự tính",
          value: "15.8M",
          trend: "+4.1%",
          isUp: true,
          color: "#27AE60",
        },
        {
          title: "Khách hàng mới",
          value: "38",
          trend: "+2.1%",
          isUp: true,
          color: "#E67E22",
        },
      ],
      revenueTrend: [
        { name: "08h", "Doanh thu": 2000000, "Lợi nhuận": 800000 },
        { name: "12h", "Doanh thu": 8200000, "Lợi nhuận": 3200000 },
        { name: "16h", "Doanh thu": 12000000, "Lợi nhuận": 4800000 },
        { name: "20h", "Doanh thu": 22000000, "Lợi nhuận": 8800000 },
      ],
      paymentData: [
        { name: "Ví MoMo", value: 70, color: "#C9A96E" },
        { name: "Khác", value: 30, color: "#2C3E50" },
      ],
      performanceData: [
        { subject: "Giao hàng", A: 140, fullMark: 150 },
        { subject: "Chất lượng", A: 130, fullMark: 150 },
        { subject: "Phản hồi", A: 120, fullMark: 150 },
        { subject: "Giá cả", A: 110, fullMark: 150 },
        { subject: "Dịch vụ", A: 145, fullMark: 150 },
      ],
      statusData: getWeeklyStatus(20),
      products: [
        {
          id: 1,
          name: "Váy Lụa Cao Cấp",
          img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100",
          sold: 12,
          rev: 2400000,
          profit: 850000,
          stock: 45,
          status: "Xu hướng",
          color: "#27AE60",
        },
      ],
    },
    "7days": {
      metrics: [
        {
          title: "Doanh thu thuần",
          value: "1.28B",
          trend: "+12.5%",
          isUp: true,
          color: "#C9A96E",
        },
        {
          title: "Tổng đơn hàng",
          value: "4.5k",
          trend: "+8.2%",
          isUp: true,
          color: "#2C3E50",
        },
        {
          title: "Lợi nhuận dự tính",
          value: "450M",
          trend: "+5.4%",
          isUp: true,
          color: "#27AE60",
        },
        {
          title: "Khách hàng mới",
          value: "1.2k",
          trend: "-2.1%",
          isUp: false,
          color: "#E67E22",
        },
      ],
      revenueTrend: [
        { name: "T2", "Doanh thu": 12000000, "Lợi nhuận": 4000000 },
        { name: "T4", "Doanh thu": 11000000, "Lợi nhuận": 3200000 },
        { name: "T6", "Doanh thu": 22000000, "Lợi nhuận": 8500000 },
        { name: "CN", "Doanh thu": 25000000, "Lợi nhuận": 9800000 },
      ],
      paymentData: [
        { name: "Ví MoMo", value: 40, color: "#C9A96E" },
        { name: "Thẻ Tín Dụng", value: 30, color: "#2C3E50" },
        { name: "COD", value: 20, color: "#27AE60" },
        { name: "Khác", value: 10, color: "#E67E22" },
      ],
      performanceData: [
        { subject: "Giao hàng", A: 120, fullMark: 150 },
        { subject: "Chất lượng", A: 98, fullMark: 150 },
        { subject: "Phản hồi", A: 86, fullMark: 150 },
        { subject: "Giá cả", A: 99, fullMark: 150 },
        { subject: "Dịch vụ", A: 85, fullMark: 150 },
      ],
      statusData: getWeeklyStatus(50),
      products: [
        {
          id: 1,
          name: "Váy Lụa Cao Cấp",
          img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100",
          sold: 125,
          rev: 25000000,
          profit: 8500000,
          stock: 45,
          status: "Xu hướng",
          color: "#27AE60",
        },
        {
          id: 2,
          name: "Áo Sơ Mi Oxford",
          img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100",
          sold: 98,
          rev: 18200000,
          profit: 5200000,
          stock: 12,
          status: "Sắp hết",
          color: "#E67E22",
        },
      ],
    },
    month: {
      metrics: [
        {
          title: "Doanh thu thuần",
          value: "5.4B",
          trend: "+15.2%",
          isUp: true,
          color: "#C9A96E",
        },
        {
          title: "Tổng đơn hàng",
          value: "18.4k",
          trend: "+10.5%",
          isUp: true,
          color: "#2C3E50",
        },
        {
          title: "Lợi nhuận dự tính",
          value: "1.8B",
          trend: "+8.1%",
          isUp: true,
          color: "#27AE60",
        },
        {
          title: "Khách hàng mới",
          value: "5.2k",
          trend: "+12.1%",
          isUp: true,
          color: "#E67E22",
        },
      ],
      revenueTrend: [
        { name: "Tuần 1", "Doanh thu": 850000000, "Lợi nhuận": 320000000 },
        { name: "Tuần 4", "Doanh thu": 1850000000, "Lợi nhuận": 700000000 },
      ],
      paymentData: [
        { name: "Thẻ", value: 50, color: "#2C3E50" },
        { name: "Ví", value: 50, color: "#C9A96E" },
      ],
      performanceData: [
        { subject: "Giao hàng", A: 110, fullMark: 150 },
        { subject: "Chất lượng", A: 120, fullMark: 150 },
        { subject: "Phản hồi", A: 115, fullMark: 150 },
        { subject: "Giá cả", A: 130, fullMark: 150 },
        { subject: "Dịch vụ", A: 105, fullMark: 150 },
      ],
      statusData: getWeeklyStatus(200),
      products: [
        {
          id: 1,
          name: "Váy Lụa Cao Cấp",
          img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100",
          sold: 850,
          rev: 175000000,
          profit: 62000000,
          stock: 45,
          status: "Xu hướng",
          color: "#27AE60",
        },
      ],
    },
    custom: {
      metrics: [
        {
          title: "Doanh thu thuần",
          value: "820M",
          trend: "Tùy chỉnh",
          isUp: true,
          color: "#C9A96E",
        },
        {
          title: "Tổng đơn hàng",
          value: "2.8k",
          trend: "Tùy chỉnh",
          isUp: true,
          color: "#2C3E50",
        },
        {
          title: "Lợi nhuận dự tính",
          value: "310M",
          trend: "Tùy chỉnh",
          isUp: true,
          color: "#27AE60",
        },
        {
          title: "Khách hàng mới",
          value: "850",
          trend: "Tùy chỉnh",
          isUp: true,
          color: "#E67E22",
        },
      ],
      revenueTrend: [
        { name: "P1", "Doanh thu": 450000000, "Lợi nhuận": 180000000 },
        { name: "P2", "Doanh thu": 370000000, "Lợi nhuận": 130000000 },
      ],
      paymentData: [
        { name: "CK", value: 60, color: "#2C3E50" },
        { name: "Ví", value: 40, color: "#C9A96E" },
      ],
      performanceData: [
        { subject: "Giao hàng", A: 110, fullMark: 150 },
        { subject: "Chất lượng", A: 115, fullMark: 150 },
        { subject: "Phản hồi", A: 140, fullMark: 150 },
        { subject: "Giá cả", A: 100, fullMark: 150 },
        { subject: "Dịch vụ", A: 125, fullMark: 150 },
      ],
      statusData: getWeeklyStatus(100),
      products: [
        {
          id: 3,
          name: "Túi Xách Da",
          img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100",
          sold: 420,
          rev: 420000000,
          profit: 120000000,
          stock: 85,
          status: "Bán chạy",
          color: "#C9A96E",
        },
      ],
    },
  };
  return ranges[range] || ranges["7days"];
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          p: 1.5,
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          border: "1px solid #F0F0F0",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 1, color: "#333" }}
        >
          {label}
        </Typography>
        {payload.map((pld, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: pld.color,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: "#666", fontWeight: 500 }}
            >
              {pld.name}:{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#111", fontWeight: 700 }}
            >
              {pld.name.includes("Doanh thu") || pld.name.includes("Lợi nhuận")
                ? formatVND(pld.value)
                : formatNumber(pld.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const Reports = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [data, setData] = useState(getDataByRange("7days"));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRangeChange = (event) => {
    const newRange = event.target.value;
    setTimeRange(newRange);
    if (newRange !== "custom") {
      setData(getDataByRange(newRange));
    }
  };

  const handleApplyCustomFilter = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng chọn đầy đủ ngày!");
      return;
    }
    setData(getDataByRange("custom"));
  };

  const handleExport = () => {
    const headers = [
      "Ten San Pham",
      "So Luong Ban",
      "Doanh Thu",
      "Loi Nhuan",
      "Ton Kho",
    ];
    const rows = data.products.map((p) => [
      p.name,
      p.sold,
      p.rev,
      p.profit,
      p.stock,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bao-cao-DailyZone.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", pb: 10 }}>
      <TopBar hideSearch={true} />

      <Box sx={{ px: { xs: 2, md: 6 }, mt: 5 }}>
        {/* Header Section - ĐÃ ĐIỀU CHỈNH KÍCH THƯỚC TIÊU ĐỀ ĐỒNG BỘ */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}
            >
              Phân Tích Kinh Doanh
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", fontWeight: 500, mt: 0.5 }}
            >
              Tổng hợp số liệu kinh doanh thực tế của cửa hàng
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExport}
                sx={{
                  borderRadius: "16px",
                  px: 3,
                  py: 1,
                  bgcolor: "#111",
                  color: "#fff",
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    bgcolor: "#C9A96E",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(201, 169, 110, 0.4)",
                  },
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Xuất Báo Cáo
              </Button>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <Select
                  value={timeRange}
                  onChange={handleRangeChange}
                  sx={{
                    borderRadius: "16px",
                    bgcolor: "#fff",
                    fontWeight: 600,
                    border: "1px solid #EAEAEA",
                  }}
                  startAdornment={
                    <DateRange sx={{ color: "#C9A96E", mr: 1, fontSize: 20 }} />
                  }
                >
                  <MenuItem value="today">Hôm nay</MenuItem>
                  <MenuItem value="7days">7 ngày vừa qua</MenuItem>
                  <MenuItem value="month">Tháng hiện tại</MenuItem>
                  <MenuItem value="custom">Tùy chỉnh...</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {timeRange === "custom" && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  bgcolor: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #C9A96E",
                  boxShadow: "0 4px 20px rgba(201, 169, 110, 0.15)",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                <TextField
                  type="date"
                  size="small"
                  label="Từ ngày"
                  InputLabelProps={{ shrink: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  type="date"
                  size="small"
                  label="Đến ngày"
                  InputLabelProps={{ shrink: true }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCustomFilter}
                  sx={{
                  bgcolor: "#111",
                  color: "#fff",
                  borderRadius: "12px",
                  fontWeight: 700,
                  px: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    bgcolor: "#C9A96E",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(201, 169, 110, 0.4)",
                  },
                }}
              >
                Áp dụng
              </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Metric Cards */}
          {data.metrics.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 3.5,
                  borderRadius: "28px",
                  border: "1px solid #EAEAEA",
                  boxShadow: "none",
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
                    bgcolor: item.color,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 900, my: 1.5, letterSpacing: "-1px" }}
                >
                  {item.title.includes("đơn") || item.title.includes("Khách")
                    ? item.value
                    : `₫${item.value}`}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: item.isUp ? "#27AE60" : "#E74C3C",
                      fontWeight: 800,
                    }}
                  >
                    {item.trend}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    so với kỳ trước
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}

          {/* Biểu đồ Doanh thu */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                p: 4,
                borderRadius: "32px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>
                BIỂU ĐỒ TĂNG TRƯỞNG DOANH THU
              </Typography>
              <Box sx={{ width: "100%", height: 420 }}>
                <ResponsiveContainer>
                  <ComposedChart data={data.revenueTrend}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#C9A96E"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#C9A96E"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F0F0F0"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => formatShort(val)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="Doanh thu"
                      fill="url(#colorRev)"
                      stroke="#C9A96E"
                      strokeWidth={5}
                    />
                    <Line
                      type="monotone"
                      dataKey="Lợi nhuận"
                      stroke="#27AE60"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      height={36}
                      iconType="circle"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Biểu đồ Sao */}
          <Grid item xs={12} lg={4}>
            <Card
              sx={{
                p: 4,
                borderRadius: "32px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>
                BIỂU ĐỒ SAO
              </Typography>
              <Box sx={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={data.performanceData}
                  >
                    <PolarGrid stroke="#E0E0E0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 13, fontWeight: 700, fill: "#444" }}
                    />
                    <Radar
                      name="Chỉ số"
                      dataKey="A"
                      stroke="#C9A96E"
                      fill="#C9A96E"
                      fillOpacity={0.65}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: "20px",
                  bgcolor: "rgba(201, 169, 110, 0.05)",
                  border: "1px dashed #C9A96E",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "#C9A96E",
                    textAlign: "center",
                  }}
                >
                  Cửa hàng đạt hạng "Kim Cương" (9.2/10)
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Phương thức thanh toán */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                p: 4,
                borderRadius: "32px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
                height: 480,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>
                PHƯƠNG THỨC THANH TOÁN
              </Typography>
              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={data.paymentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={10}
                      dataKey="value"
                    >
                      {data.paymentData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          cornerRadius={8}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                {data.paymentData.map((item) => (
                  <Box
                    key={item.name}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "4px",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: "#444" }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Trạng thái đơn hàng */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                p: 4,
                borderRadius: "32px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
                height: 480,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>
                TRẠNG THÁI ĐƠN HÀNG TRONG TUẦN
              </Typography>
              <Box sx={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={data.statusData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F0F0F0"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" align="right" iconType="rect" />
                    <Bar
                      dataKey="Thành công"
                      stackId="a"
                      fill="#27AE60"
                      barSize={35}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar dataKey="Đã hủy" stackId="a" fill="#E74C3C" />
                    <Bar
                      dataKey="Trả hàng"
                      stackId="a"
                      fill="#F1C40F"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Bảng sản phẩm */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: "32px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 4,
                  bgcolor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Inventory2Outlined sx={{ color: "#C9A96E" }} />
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  HIỆU SUẤT SẢN PHẨM & TỒN KHO
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800 }}>Sản phẩm</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Đã bán</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Doanh thu</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Lợi nhuận</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Tồn kho</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.products.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{ "& td": { borderBottom: "1px solid #F5F5F5" } }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2.5,
                            }}
                          >
                            <Avatar
                              src={row.img}
                              variant="rounded"
                              sx={{
                                width: 55,
                                height: 55,
                                borderRadius: "14px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                              }}
                            />
                            <Typography
                              sx={{ fontWeight: 700, fontSize: "0.95rem" }}
                            >
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          {formatNumber(row.sold)}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>
                          {formatVND(row.rev)}
                        </TableCell>
                        <TableCell sx={{ color: "#27AE60", fontWeight: 800 }}>
                          {formatVND(row.profit)}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 800,
                                color: row.stock < 15 ? "#E74C3C" : "#111",
                              }}
                            >
                              {formatNumber(row.stock)}
                            </Typography>
                            {row.stock < 15 && (
                              <Chip
                                label="Sắp hết"
                                size="small"
                                sx={{
                                  fontSize: "10px",
                                  height: "20px",
                                  bgcolor: "#FDEDEC",
                                  color: "#E74C3C",
                                  fontWeight: 800,
                                  borderRadius: "6px",
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              bgcolor: `${row.color}15`,
                              color: row.color,
                              fontWeight: 800,
                              borderRadius: "8px",
                              px: 1,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Reports;
