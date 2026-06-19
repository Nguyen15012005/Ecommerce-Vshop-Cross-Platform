import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip as MuiTooltip,
  Stack,
  Pagination,
  Paper,
  Divider,
  Snackbar,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  ContentCopy,
  ToggleOn,
  ToggleOff,
  BarChartOutlined,
  LocalActivity,
  History,
  TrendingUp,
  MoreVert,
  ContentPaste,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TopBar from "../../components/navbar/TopBar";

// --- DỮ LIỆU GIẢ LẬP ---
const initialVouchers = [
  {
    id: 1,
    code: "SUMMER2024",
    name: "Ưu đãi Hè rực rỡ",
    type: "percentage",
    value: 15,
    minOrder: 500000,
    maxDiscount: 100000,
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    status: "active",
    usageCount: 145,
    totalUsage: 200,
    revenue: 12500000,
  },
  {
    id: 2,
    code: "WELCOME50",
    name: "Chào mừng khách mới",
    type: "fixed",
    value: 50000,
    minOrder: 200000,
    maxDiscount: null,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    usageCount: 890,
    totalUsage: 1000,
    revenue: 45000000,
  },
  {
    id: 3,
    code: "FREESHIP99",
    name: "Miễn phí vận chuyển",
    type: "fixed",
    value: 30000,
    minOrder: 99000,
    maxDiscount: null,
    startDate: "2024-04-15",
    endDate: "2024-05-15",
    status: "scheduled",
    usageCount: 0,
    totalUsage: 500,
    revenue: 0,
  },
  {
    id: 4,
    code: "BLACKFRIDAY",
    name: "Sale sập sàn Black Friday",
    type: "percentage",
    value: 50,
    minOrder: 0,
    maxDiscount: 200000,
    startDate: "2023-11-20",
    endDate: "2023-11-25",
    status: "expired",
    usageCount: 500,
    totalUsage: 500,
    revenue: 150000000,
  },
];

const statsData = [
  { name: "T2", uses: 45 },
  { name: "T3", uses: 52 },
  { name: "T4", uses: 38 },
  { name: "T5", uses: 65 },
  { name: "T6", uses: 88 },
  { name: "T7", uses: 120 },
  { name: "CN", uses: 95 },
];

const COLORS = ["#C9A96E", "#2C3E50", "#27AE60", "#E67E22"];
const CHART_COLORS = ["#C9A96E", "#2C3E50", "#27AE60", "#E67E22"];

const Discounts = () => {
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [openForm, setOpenForm] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // "newest", "most_used", "expiring_soon"

  const [viewMode, setViewMode] = useState("table"); // "table" hoặc "card"
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    type: "percentage",
    value: "",
    minOrder: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    totalUsage: "",
    perUserLimit: 1,
    applyTo: "all",
  });

  const handleOpenForm = (voucher = null) => {
    if (voucher) {
      setEditingVoucher(voucher);
      setFormData({
        ...voucher,
      });
    } else {
      setEditingVoucher(null);
      setFormData({
        name: "",
        code: "",
        description: "",
        type: "percentage",
        value: "",
        minOrder: "",
        maxDiscount: "",
        startDate: "",
        endDate: "",
        totalUsage: "",
        perUserLimit: 1,
        applyTo: "all",
      });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  const handleSaveVoucher = () => {
    // Basic Validation
    if (!formData.name || !formData.code || !formData.value || !formData.startDate || !formData.endDate) {
      setSnackbar({ open: true, message: "Vui lòng điền đầy đủ các thông tin bắt buộc!" });
      return;
    }

    if (editingVoucher) {
      setVouchers(
        vouchers.map((v) =>
          v.id === editingVoucher.id ? { ...formData, id: v.id } : v
        )
      );
      setSnackbar({ open: true, message: "Đã cập nhật mã giảm giá thành công!" });
    } else {
      setVouchers([
        ...vouchers,
        { 
          ...formData, 
          id: Date.now(), 
          usageCount: 0, 
          revenue: 0, 
          status: new Date(formData.startDate) > new Date() ? "scheduled" : "active" 
        },
      ]);
      setSnackbar({ open: true, message: "Đã tạo mã giảm giá mới thành công!" });
    }
    handleCloseForm();
  };

  const handleDeleteVoucher = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) {
      setVouchers(vouchers.filter((v) => v.id !== id));
      setSnackbar({ open: true, message: "Đã xóa mã giảm giá." });
    }
  };

  const handleDuplicateVoucher = (voucher) => {
    const duplicated = {
      ...voucher,
      id: Date.now(),
      code: `${voucher.code}_COPY`,
      name: `${voucher.name} (Bản sao)`,
      usageCount: 0,
      revenue: 0,
      status: "scheduled"
    };
    setVouchers([...vouchers, duplicated]);
    setSnackbar({ open: true, message: "Đã nhân bản mã giảm giá!" });
  };

  const handleToggleStatus = (id) => {
    setVouchers(vouchers.map(v => {
      if (v.id === id) {
        const newStatus = v.status === "disabled" ? "active" : "disabled";
        return { ...v, status: newStatus };
      }
      return v;
    }));
    setSnackbar({ open: true, message: "Đã cập nhật trạng thái mã giảm giá!" });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setSnackbar({ open: true, message: "Đã sao chép mã: " + code });
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "active":
        return <Chip label="Đang chạy" color="success" size="small" sx={{ fontWeight: 600 }} />;
      case "scheduled":
        return <Chip label="Sắp diễn ra" color="info" size="small" sx={{ fontWeight: 600 }} />;
      case "expired":
        return <Chip label="Hết hạn" color="error" size="small" sx={{ fontWeight: 600 }} />;
      case "disabled":
        return <Chip label="Đã tắt" color="default" size="small" sx={{ fontWeight: 600 }} />;
      default:
        return null;
    }
  };

  const formatVND = (value) => {
    if (!value) return "0đ";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  const getTimeRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    if (diff < 0) return "Đã kết thúc";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `Còn ${days} ngày`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `Còn ${hours} giờ`;
  };

  const filteredVouchers = vouchers
    .filter((v) => {
      const matchesSearch = v.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           v.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || v.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "most_used") return b.usageCount - a.usageCount;
      if (sortBy === "expiring_soon") return new Date(a.endDate) - new Date(b.endDate);
      return 0;
    });

  return (
    <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", pb: 10 }}>
      <TopBar hideSearch={true} />

      <Box sx={{ px: { xs: 2, md: 6 }, mt: 5 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
              Quản Lý Mã Giảm Giá
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: 500, mt: 0.5 }}>
              Tạo và quản lý các chương trình khuyến mãi của bạn
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenForm()}
            sx={{
              bgcolor: "#111",
              color: "#fff",
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": { 
                bgcolor: "#C9A96E",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(201, 169, 110, 0.4)",
              },
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          >
            Tạo Mã Mới
          </Button>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            { title: "Mã đang chạy", value: "12", icon: <LocalActivity />, color: "#C9A96E" },
            { title: "Lượt dùng (30 ngày)", value: "1,245", icon: <History />, color: "#2C3E50" },
            { title: "Doanh thu Voucher", value: "125M", icon: <TrendingUp />, color: "#27AE60" },
            { title: "Tỉ lệ sử dụng", value: "68%", icon: <BarChartOutlined />, color: "#E67E22" },
          ].map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  p: 3.5,
                  borderRadius: "28px",
                  border: "1px solid #EAEAEA",
                  boxShadow: "none",
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: "#fff",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 4,
                    height: "100%",
                    bgcolor: stat.color,
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
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 900, my: 1.5, letterSpacing: "-1px", color: "#111" }}
                >
                  {stat.value}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#27AE60", fontWeight: 800 }}
                  >
                    +5.2%
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    so với kỳ trước
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters & Search */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: "20px", border: "1px solid #EAEAEA", boxShadow: "none" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Tìm kiếm theo mã hoặc tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#999" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={statusFilter}
                  label="Trạng thái"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ borderRadius: "12px" }}
                >
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="active">Đang chạy</MenuItem>
                  <MenuItem value="scheduled">Sắp diễn ra</MenuItem>
                  <MenuItem value="expired">Hết hạn</MenuItem>
                  <MenuItem value="disabled">Đã tắt</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Sắp xếp theo</InputLabel>
                <Select
                  value={sortBy}
                  label="Sắp xếp theo"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: "12px" }}
                >
                  <MenuItem value="newest">Mới nhất</MenuItem>
                  <MenuItem value="most_used">Sử dụng nhiều</MenuItem>
                  <MenuItem value="expiring_soon">Sắp hết hạn</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button 
                variant={viewMode === "table" ? "contained" : "outlined"}
                onClick={() => setViewMode("table")}
                sx={{ borderRadius: "10px", minWidth: 40, px: 2, bgcolor: viewMode === "table" ? "#C9A96E" : "transparent", borderColor: "#C9A96E", color: viewMode === "table" ? "#fff" : "#C9A96E" }}
              >
                Bảng
              </Button>
              <Button 
                variant={viewMode === "card" ? "contained" : "outlined"}
                onClick={() => setViewMode("card")}
                sx={{ borderRadius: "10px", minWidth: 40, px: 2, bgcolor: viewMode === "card" ? "#C9A96E" : "transparent", borderColor: "#C9A96E", color: viewMode === "card" ? "#fff" : "#C9A96E" }}
              >
                Thẻ
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {viewMode === "table" ? (
          <TableContainer component={Paper} sx={{ borderRadius: "24px", border: "1px solid #EAEAEA", boxShadow: "none", overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Mã Voucher</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Kiểu giảm</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Giá trị</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Điều kiện</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Sử dụng</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#111" }}>Trạng thái</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#111" }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVouchers.map((v) => (
                  <TableRow key={v.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#C9A96E" }}>{v.code}</Typography>
                        <Typography variant="caption" sx={{ color: "#666" }}>{v.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {v.type === "percentage" ? "Phần trăm" : "Cố định"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {v.type === "percentage" ? `${v.value}%` : formatVND(v.value)}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        Đơn {">"} {formatVND(v.minOrder)}
                      </Typography>
                      {v.maxDiscount && (
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          Giảm tối đa {formatVND(v.maxDiscount)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 100 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>{v.usageCount}</Typography>
                          <Typography variant="caption" sx={{ color: "#999" }}>{Math.round((v.usageCount/v.totalUsage)*100)}%</Typography>
                        </Box>
                        <Box sx={{ width: "100%", height: 6, bgcolor: "#eee", borderRadius: 3 }}>
                          <Box sx={{ width: `${(v.usageCount/v.totalUsage)*100}%`, height: "100%", bgcolor: "#C9A96E", borderRadius: 3 }} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{getTimeRemaining(v.endDate)}</Typography>
                      <Typography variant="caption" sx={{ color: "#999" }}>{v.endDate}</Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(v.status)}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <MuiTooltip title="Sao chép mã">
                          <IconButton size="small" onClick={() => handleCopyCode(v.code)} sx={{ color: "#666" }}>
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title={v.status === "disabled" ? "Bật mã" : "Tắt mã"}>
                          <IconButton size="small" onClick={() => handleToggleStatus(v.id)} sx={{ color: v.status === "disabled" ? "#27AE60" : "#666" }}>
                            {v.status === "disabled" ? <ToggleOff fontSize="small" /> : <ToggleOn fontSize="small" />}
                          </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="Nhân bản">
                          <IconButton size="small" onClick={() => handleDuplicateVoucher(v)} sx={{ color: "#2C3E50" }}>
                            <History fontSize="small" />
                          </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="Chỉnh sửa">
                          <IconButton size="small" onClick={() => handleOpenForm(v)} sx={{ color: "#C9A96E" }}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="Xóa">
                          <IconButton size="small" onClick={() => handleDeleteVoucher(v.id)} sx={{ color: "#ff4d4d" }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </MuiTooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            {filteredVouchers.map((v) => (
              <Grid item xs={12} sm={6} md={4} key={v.id}>
                <Card sx={{ 
                  borderRadius: "24px", 
                  border: "1px solid #EAEAEA", 
                  boxShadow: "none",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": { boxShadow: "0 12px 30px rgba(0,0,0,0.05)" },
                  transition: "all 0.3s ease"
                }}>
                  <Box sx={{ p: 3, borderBottom: "1px dashed #EAEAEA", bgcolor: `${COLORS[v.id % COLORS.length]}05` }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      {getStatusChip(v.status)}
                      <Typography sx={{ fontWeight: 900, color: "#C9A96E", fontSize: "1.2rem" }}>{v.code}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{v.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Giảm {v.type === "percentage" ? `${v.value}%` : formatVND(v.value)} cho đơn từ {formatVND(v.minOrder)}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="caption" sx={{ color: "#999", fontWeight: 600 }}>SỬ DỤNG</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>{v.usageCount}/{v.totalUsage}</Typography>
                    </Box>
                    <Box sx={{ width: "100%", height: 6, bgcolor: "#eee", borderRadius: 3, mb: 3 }}>
                      <Box sx={{ width: `${(v.usageCount/v.totalUsage)*100}%`, height: "100%", bgcolor: "#C9A96E", borderRadius: 3 }} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#999", display: "block" }}>HẾT HẠN</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{v.endDate}</Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <MuiTooltip title="Nhân bản">
                          <IconButton size="small" onClick={() => handleDuplicateVoucher(v)} sx={{ bgcolor: "#f5f5f5" }}><History fontSize="small" /></IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="Sao chép">
                          <IconButton size="small" onClick={() => handleCopyCode(v.code)} sx={{ bgcolor: "#f5f5f5" }}><ContentCopy fontSize="small" /></IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="Chỉnh sửa">
                          <IconButton size="small" onClick={() => handleOpenForm(v)} sx={{ bgcolor: "#f5f5f5", color: "#C9A96E" }}><Edit fontSize="small" /></IconButton>
                        </MuiTooltip>
                        <MuiTooltip title={v.status === "disabled" ? "Bật" : "Tắt"}>
                          <IconButton size="small" onClick={() => handleToggleStatus(v.id)} sx={{ bgcolor: "#f5f5f5", color: v.status === "disabled" ? "#27AE60" : "#666" }}>
                            {v.status === "disabled" ? <ToggleOff fontSize="small" /> : <ToggleOn fontSize="small" />}
                          </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="Xóa">
                          <IconButton size="small" onClick={() => handleDeleteVoucher(v.id)} sx={{ bgcolor: "#f5f5f5", color: "#ff4d4d" }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </MuiTooltip>
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Statistics Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4, borderRadius: "32px", border: "1px solid #EAEAEA", boxShadow: "none", bgcolor: "#fff" }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>HIỆU QUẢ SỬ DỤNG VOUCHER (7 NGÀY QUA)</Typography>
              <Box sx={{ height: 420 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip />
                    <Bar dataKey="uses" fill="#C9A96E" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, borderRadius: "32px", border: "1px solid #EAEAEA", boxShadow: "none", height: "100%", bgcolor: "#fff" }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>PHÂN BỔ TRẠNG THÁI</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Đang chạy", value: 12 },
                        { name: "Sắp diễn ra", value: 5 },
                        { name: "Hết hạn", value: 8 },
                        { name: "Đã tắt", value: 3 },
                      ]}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CHART_COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                {["Đang chạy", "Sắp diễn ra", "Hết hạn", "Đã tắt"].map((label, i) => (
                  <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: CHART_COLORS[i] }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#666" }}>{label}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#111" }}>{Math.floor(Math.random() * 20)}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth sx={{ "& .MuiPaper-root": { borderRadius: "24px" } }}>
        <DialogTitle sx={{ fontWeight: 800, p: 3 }}>
          {editingVoucher ? "Chỉnh sửa Mã giảm giá" : "Tạo Mã giảm giá mới"}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Thông tin cơ bản */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#C9A96E" }}>THÔNG TIN CƠ BẢN</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên chiến dịch"
                    placeholder="Ví dụ: Ưu đãi Hè rực rỡ"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mã Voucher"
                    placeholder="Ví dụ: SUMMER2024"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Mô tả"
                    placeholder="Nhập mô tả cho chương trình này..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Kiểu giảm giá */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#C9A96E" }}>KIỂU GIẢM GIÁ & GIÁ TRỊ</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Loại giảm giá</InputLabel>
                    <Select
                      value={formData.type}
                      label="Loại giảm giá"
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <MenuItem value="percentage">Giảm theo %</MenuItem>
                      <MenuItem value="fixed">Giảm số tiền cố định</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Giá trị giảm"
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{formData.type === "percentage" ? "%" : "đ"}</InputAdornment>,
                    }}
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  {formData.type === "percentage" && (
                    <TextField
                      fullWidth
                      label="Giảm tối đa"
                      type="number"
                      InputProps={{ endAdornment: <InputAdornment position="end">đ</InputAdornment> }}
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Điều kiện */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#C9A96E" }}>ĐIỀU KIỆN ÁP DỤNG</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Giá trị đơn hàng tối thiểu"
                    type="number"
                    InputProps={{ endAdornment: <InputAdornment position="end">đ</InputAdornment> }}
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Áp dụng cho</InputLabel>
                    <Select
                      value={formData.applyTo}
                      label="Áp dụng cho"
                      onChange={(e) => setFormData({ ...formData, applyTo: e.target.value })}
                    >
                      <MenuItem value="all">Toàn bộ shop</MenuItem>
                      <MenuItem value="category">Danh mục cụ thể</MenuItem>
                      <MenuItem value="product">Sản phẩm cụ thể</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Thời gian */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#C9A96E" }}>THỜI GIAN HIỆU LỰC</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ngày bắt đầu"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ngày kết thúc"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Giới hạn */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#C9A96E" }}>GIỚI HẠN SỬ DỤNG & ĐỐI TƯỢNG</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tổng số lượt dùng tối đa"
                    type="number"
                    value={formData.totalUsage}
                    onChange={(e) => setFormData({ ...formData, totalUsage: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Lượt dùng tối đa mỗi khách hàng"
                    type="number"
                    value={formData.perUserLimit}
                    onChange={(e) => setFormData({ ...formData, perUserLimit: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseForm} sx={{ color: "#666", fontWeight: 700 }}>Hủy bỏ</Button>
          <Button
            variant="contained"
            onClick={handleSaveVoucher}
            sx={{
              bgcolor: "#111",
              color: "#fff",
              px: 4,
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#C9A96E",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(201, 169, 110, 0.4)",
              },
            }}
          >
            Lưu Thay Đổi
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  );
};

export default Discounts;
