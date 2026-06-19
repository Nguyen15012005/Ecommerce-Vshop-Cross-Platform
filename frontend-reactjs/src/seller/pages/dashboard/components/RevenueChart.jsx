import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Box, Typography, MenuItem, Select } from "@mui/material";

const data = [
  { name: "12 Aug", revenue: 8000, order: 4000 },
  { name: "13 Aug", revenue: 10000, order: 5000 },
  { name: "14 Aug", revenue: 9000, order: 6000 },
  { name: "15 Aug", revenue: 11000, order: 4500 },
  { name: "16 Aug", revenue: 13000, order: 8000 },
  { name: "17 Aug", revenue: 10000, order: 5500 },
  { name: "18 Aug", revenue: 12000, order: 7000 },
  { name: "19 Aug", revenue: 11000, order: 6000 },
];

const RevenueChart = () => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#fff",
        borderRadius: "24px",
        border: "1px solid #F0F0F0",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Phân tích doanh thu
        </Typography>
        <Select
          size="small"
          defaultValue={8}
          sx={{
            borderRadius: "10px",
            bgcolor: "#C9A96E",
            color: "#fff",
            "& .MuiSelect-icon": { color: "#fff" },
          }}
        >
          <MenuItem value={8}>8 ngày gần nhất</MenuItem>
          <MenuItem value={30}>30 ngày gần nhất</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 12, height: 2, bgcolor: "#C9A96E" }} />
          <Typography variant="caption" color="textSecondary">
            Doanh thu
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 2,
              bgcolor: "#C9A96E",
              opacity: 0.3,
              borderStyle: "dashed",
              borderTopWidth: 2,
            }}
          />
          <Typography variant="caption" color="textSecondary">
            Đơn hàng
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#C9A96E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F0F0F0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#999" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#999" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A96E"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRev)"
            />
            <Line
              type="monotone"
              dataKey="order"
              stroke="#C9A96E"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              opacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default RevenueChart;
