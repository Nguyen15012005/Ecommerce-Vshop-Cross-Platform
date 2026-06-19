import React from "react";
import {
  Box,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Typography,
} from "@mui/material";
import {
  Search,
  NotificationsNone,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TopBar = ({ hideSearch }) => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.seller);
  const sellerName =
    profile?.sellerName || profile?.businessDetails?.businessName || "Người bán";
  const sellerEmail = profile?.email || "Chủ cửa hàng";

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      p: 3,
      bgcolor: 'transparent'
    }}>
      {/* Search bar */}
      {!hideSearch ? (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: '#fff', 
          px: 2, 
          py: 1, 
          borderRadius: '12px',
          width: 400,
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          border: '1px solid #EAEAEA'
        }}>
          <Search sx={{ color: 'gray', mr: 1, fontSize: 20 }} />
          <InputBase 
            placeholder="Tìm kiếm tồn kho, đơn hàng..." 
            sx={{ flex: 1, fontSize: '0.9rem' }} 
          />
        </Box>
      ) : (
        <Box sx={{ flex: 1 }} />
      )}

      {/* Right side icons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton sx={{ bgcolor: "#fff", border: "1px solid #EAEAEA" }}>
          <ChatBubbleOutline fontSize="small" />
        </IconButton>

        <IconButton sx={{ bgcolor: "#fff", border: "1px solid #EAEAEA" }}>
          <Badge color="error" variant="dot">
            <NotificationsNone fontSize="small" />
          </Badge>
        </IconButton>

        <Box 
          onClick={() => navigate("/seller/settings")}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5, 
            ml: 1, 
            cursor: "pointer",
            p: 0.5,
            borderRadius: "16px",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.02)"
            }
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, lineHeight: 1.2, color: "#111", fontSize: "0.95rem" }}
            >
              {sellerName}
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 500 }}>
              {sellerEmail}
            </Typography>
          </Box>
          <Avatar
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"
            sx={{ 
              width: 45, 
              height: 45, 
              borderRadius: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "2px solid #fff"
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
