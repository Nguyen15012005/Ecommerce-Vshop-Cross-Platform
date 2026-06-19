import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  GridView as DashboardIcon,
  ShoppingBagOutlined as OrderIcon,
  Inventory2Outlined as ProductIcon,
  PeopleOutlined as CustomerIcon,
  BarChartOutlined as ReportIcon,
  ConfirmationNumberOutlined as DiscountIcon,
  SettingsOutlined as SettingIcon,
  HelpOutline as HelpIcon,
  Link as IntegrationIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/seller" },
  { text: "Đơn hàng", icon: <OrderIcon />, path: "/seller/orders" },
  { text: "Sản phẩm", icon: <ProductIcon />, path: "/seller/products" },
  { text: "Khách hàng", icon: <CustomerIcon />, path: "/seller/customers" },
  { text: "Báo cáo", icon: <ReportIcon />, path: "/seller/reports" },
  { text: "Mã giảm giá", icon: <DiscountIcon />, path: "/seller/discounts" },
];

const subItems = [
  { text: "Trợ giúp", icon: <HelpIcon />, path: "/seller/help" },
  { text: "Cài đặt", icon: <SettingIcon />, path: "/seller/settings" },
];

const SellerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderList = (items) => (
    <List sx={{ px: 2 }}>
      {items.map((item) => {
        const active = location.pathname === item.path;
        return (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: "12px",
                backgroundColor: active ? "#C9A96E" : "transparent",
                color: active ? "#fff" : "#666",
                "&:hover": {
                  backgroundColor: active ? "#b38f4d" : "#f5f5f5",
                },
                "& .MuiListItemIcon-root": {
                  color: active ? "#fff" : "#666",
                  minWidth: 40,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: active ? 600 : 500,
                  fontSize: "0.9rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          borderRight: "1px solid #EAEAEA",
          backgroundColor: "#FFF",
        },
      }}
    >
      {/* LOGO DZ - CHỮ D CAO HƠN MỘT CHÚT */}
      <Box
        sx={{
          p: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
        }}
        onClick={() => navigate("/seller")}
      >
        <Box
          sx={{ display: "flex", position: "relative", width: 45, height: 40 }}
        >
          <Typography
            sx={{
              fontSize: "38px",
              fontFamily: "serif",
              color: "#C9A96E",
              position: "absolute",
              left: 0,
              top: -10,
            }}
          >
            D
          </Typography>
          <Typography
            sx={{
              fontSize: "38px",
              fontFamily: "serif",
              color: "#C9A96E",
              position: "absolute",
              left: 12,
              top: 4,
            }}
          >
            Z
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              fontFamily: "serif",
              letterSpacing: "3px",
              color: "#111",
              lineHeight: 1.2,
            }}
          >
            DAILY ZONE
          </Typography>
          <Typography
            sx={{
              fontSize: "8px",
              letterSpacing: "4px",
              color: "#999",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            STYLE YOUR LIFE
          </Typography>
        </Box>
      </Box>

      {renderList(menuItems)}

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ mx: 3, my: 1 }} />
      {renderList(subItems)}
      <Box sx={{ mb: 2 }}>
        <ListItem disablePadding sx={{ px: 2 }}>
          <ListItemButton sx={{ borderRadius: "12px", color: "#ff4d4d" }}>
            <ListItemIcon sx={{ color: "#ff4d4d", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Đăng xuất"
              primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default SellerSidebar;
