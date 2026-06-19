import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Stack,
  MenuItem,
} from "@mui/material";
import {
  Store,
  LocalShipping,
  Payments,
  Notifications,
  Security,
  PhotoCamera,
  Save,
  Add,
  DeleteOutline,
} from "@mui/icons-material";
import TopBar from "../../components/navbar/TopBar";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [storeInfo, setStoreInfo] = useState({
    name: "DailyZone Premium Store",
    username: "dailyzone_official",
    email: "longffwar@gmail.com",
    phone: "0901234567",
    address: "123 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    description: "Chuyên cung cấp các sản phẩm thời trang cao cấp và phụ kiện chính hãng.",
  });

  const [shippers, setShippers] = useState([
    { name: "Giao Hàng Nhanh (GHN)", desc: "Dự kiến 2-3 ngày làm việc", status: true },
    { name: "Giao Hàng Tiết Kiệm (GHTK)", desc: "Giá rẻ, dự kiến 3-5 ngày làm việc", status: true },
    { name: "Ninja Van", desc: "Hỗ trợ vùng sâu vùng xa", status: false },
    { name: "J&T Express", desc: "Dịch vụ ổn định", status: true },
  ]);

  const handleShipperToggle = (index) => () => {
    const newShippers = [...shippers];
    newShippers[index].status = !newShippers[index].status;
    setShippers(newShippers);
  };

  const handleSave = () => {
    alert("Đã lưu thay đổi cấu hình hệ thống thành công!");
    console.log("Saved Info:", storeInfo);
    console.log("Shippers:", shippers);
  };

  const handleInputChange = (field) => (event) => {
    setStoreInfo({ ...storeInfo, [field]: event.target.value });
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pb: 10 }}>
      <TopBar hideSearch={true} />

      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: "#111" }}>
          Cài Đặt Hệ Thống
        </Typography>

        <Grid container spacing={4}>
          {/* Left Sidebar: Tabs */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: "28px", border: "1px solid #EAEAEA", boxShadow: "none", overflow: "hidden" }}>
              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={(e, v) => setActiveTab(v)}
                sx={{
                  "& .MuiTabs-indicator": { left: 0, width: 4, bgcolor: "#C9A96E" },
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    px: 3,
                    py: 2.5,
                    fontWeight: 600,
                    textTransform: "none",
                    color: "#666",
                    "&.Mui-selected": { color: "#C9A96E" },
                  },
                }}
              >
                <Tab icon={<Store sx={{ mr: 1.5 }} />} iconPosition="start" label="Thông tin cửa hàng" />
                <Tab icon={<LocalShipping sx={{ mr: 1.5 }} />} iconPosition="start" label="Vận chuyển" />
                <Tab icon={<Payments sx={{ mr: 1.5 }} />} iconPosition="start" label="Thanh toán" />
                <Tab icon={<Notifications sx={{ mr: 1.5 }} />} iconPosition="start" label="Thông báo" />
                <Tab icon={<Security sx={{ mr: 1.5 }} />} iconPosition="start" label="Bảo mật & Tài khoản" />
              </Tabs>
            </Card>
          </Grid>

          {/* Right Content: Tab Panels */}
          <Grid item xs={12} md={9}>
            <Card sx={{ p: 4, borderRadius: "32px", border: "1px solid #EAEAEA", boxShadow: "none" }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Thông Tin Cửa Hàng</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 6 }}>
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200"
                        sx={{ width: 120, height: 120, border: "4px solid #fff", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          bgcolor: "#C9A96E",
                          color: "#fff",
                          "&:hover": { bgcolor: "#b38f4d" },
                        }}
                        size="small"
                      >
                        <PhotoCamera fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Logo Cửa Hàng</Typography>
                      <Typography variant="body2" color="textSecondary">Định dạng JPG, PNG. Tối đa 2MB.</Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        label="Tên cửa hàng" 
                        fullWidth 
                        value={storeInfo.name} 
                        onChange={handleInputChange('name')}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }} 
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        label="Username" 
                        fullWidth 
                        value={storeInfo.username} 
                        disabled 
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }} 
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        label="Email" 
                        fullWidth 
                        value={storeInfo.email} 
                        onChange={handleInputChange('email')}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }} 
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        label="Số điện thoại" 
                        fullWidth 
                        value={storeInfo.phone} 
                        onChange={handleInputChange('phone')}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        label="Địa chỉ" 
                        fullWidth 
                        value={storeInfo.address} 
                        onChange={handleInputChange('address')}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        label="Mô tả cửa hàng" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        value={storeInfo.description} 
                        onChange={handleInputChange('description')}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }} 
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      startIcon={<Save />}
                      sx={{
                        bgcolor: "#111",
                        color: "#fff",
                        px: 6,
                        py: 1.5,
                        borderRadius: "16px",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#C9A96E",
                          boxShadow: "0 6px 20px rgba(201, 169, 110, 0.4)",
                        },
                      }}
                    >
                      Lưu Thay Đổi
                    </Button>
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Cài Đặt Vận Chuyển</Typography>
                  <Stack spacing={4}>
                    {shippers.map((shipper, i) => (
                      <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3, borderRadius: "20px", border: "1px solid #F5F5F5", "&:hover": { bgcolor: "#f9f9f9" } }}>
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>{shipper.name}</Typography>
                          <Typography variant="body2" color="textSecondary">{shipper.desc}</Typography>
                        </Box>
                        <Switch 
                          checked={shipper.status} 
                          onChange={handleShipperToggle(i)}
                          sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#C9A96E" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#C9A96E" } }} 
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Cài Đặt Thanh Toán</Typography>
                  <Box sx={{ mb: 6 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Tài khoản ngân hàng liên kết</Typography>
                    <Card sx={{ p: 3, borderRadius: "20px", border: "2px dashed #EAEAEA", boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", "&:hover": { borderColor: "#C9A96E", bgcolor: "rgba(201, 169, 110, 0.05)" } }}>
                      <Box sx={{ textAlign: "center" }}>
                        <IconButton sx={{ bgcolor: "rgba(201, 169, 110, 0.1)", color: "#C9A96E", mb: 1 }}>
                          <Add />
                        </IconButton>
                        <Typography sx={{ fontWeight: 700 }}>Thêm tài khoản ngân hàng mới</Typography>
                      </Box>
                    </Card>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Ví Người Bán</Typography>
                    <Card sx={{ p: 4, borderRadius: "24px", bgcolor: "#111", color: "#fff", position: "relative", overflow: "hidden" }}>
                      <Box sx={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", bgcolor: "rgba(201, 169, 110, 0.2)" }} />
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>SỐ DƯ KHẢ DỤNG</Typography>
                      <Typography variant="h3" sx={{ fontWeight: 900, my: 1 }}>₫24,580,000</Typography>
                      <Button variant="contained" sx={{ mt: 2, bgcolor: "#C9A96E", color: "#fff", fontWeight: 700, borderRadius: "10px", "&:hover": { bgcolor: "#b38f4d" } }}>Rút Tiền Ngay</Button>
                    </Card>
                  </Box>
                </Box>
              )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Cài Đặt Thông Báo</Typography>
                  <Stack spacing={2}>
                    <FormControlLabel control={<Switch defaultChecked sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#C9A96E" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#C9A96E" } }} />} label="Thông báo đơn hàng mới qua App" />
                    <Divider />
                    <FormControlLabel control={<Switch defaultChecked sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#C9A96E" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#C9A96E" } }} />} label="Thông báo qua Email khi có phản hồi mới" />
                    <Divider />
                    <FormControlLabel control={<Switch sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#C9A96E" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#C9A96E" } }} />} label="Thông báo cập nhật từ hệ thống DailyZone" />
                  </Stack>
                </Box>
              )}

              {activeTab === 4 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Bảo Mật & Tài Khoản</Typography>
                  <Stack spacing={4}>
                    <Box sx={{ p: 3, borderRadius: "20px", border: "1px solid #F5F5F5" }}>
                      <Typography sx={{ fontWeight: 700, mb: 1 }}>Đổi mật khẩu</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Thay đổi mật khẩu đăng nhập để bảo vệ tài khoản của bạn.</Typography>
                      <Button variant="outlined" sx={{ borderRadius: "10px", color: "#111", borderColor: "#111", fontWeight: 700 }}>Thay đổi ngay</Button>
                    </Box>
                    <Box sx={{ p: 3, borderRadius: "20px", border: "1px solid #F5F5F5" }}>
                      <Typography sx={{ fontWeight: 700, mb: 1 }}>Xác thực 2 lớp (2FA)</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Tăng cường bảo mật bằng cách yêu cầu mã xác nhận khi đăng nhập.</Typography>
                      <Button variant="outlined" sx={{ borderRadius: "10px", color: "#C9A96E", borderColor: "#C9A96E", fontWeight: 700 }}>Kích hoạt</Button>
                    </Box>
                    <Box sx={{ p: 3, borderRadius: "20px", border: "1px solid #F5F5F5", bgcolor: "#FFF5F5" }}>
                      <Typography sx={{ fontWeight: 700, mb: 1, color: "#E74C3C" }}>Xóa tài khoản cửa hàng</Typography>
                      <Typography variant="body2" sx={{ color: "#E74C3C", mb: 3 }}>Lưu ý: Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.</Typography>
                      <Button variant="contained" sx={{ borderRadius: "10px", bgcolor: "#E74C3C", fontWeight: 700 }}>Yêu cầu xóa</Button>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings;
