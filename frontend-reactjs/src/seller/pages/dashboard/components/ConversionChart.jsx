import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Box, Typography, MenuItem, Select } from "@mui/material";

const data = [
  { name: "Lượt xem", value: 25000, trend: "+5%" },
  { name: "Thêm giỏ", value: 12000, trend: "+8%" },
  { name: "Thanh toán", value: 8500, trend: "+4%" },
  { name: "Hoàn tất", value: 6200, trend: "+7%" },
  { name: "Hủy đơn", value: 3000, trend: "-5%" },
];

const ConversionChart = () => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#fff",
        borderRadius: "24px",
        border: "1px solid #F0F0F0",
        height: 400,
        display: "flex",
        flexDirection: "column",
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
          Tỉ lệ chuyển đổi
        </Typography>
        <Select size="small" defaultValue="week" sx={{ borderRadius: "10px" }}>
          <MenuItem value="week">Tuần này</MenuItem>
          <MenuItem value="month">Tháng này</MenuItem>
        </Select>
      </Box>

      <Box sx={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20 }}>
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
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(201, 169, 110, 0.05)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? "#F0F0F0" : "#FFE0B3"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {data.map((item) => (
          <Box key={item.name} sx={{ textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, display: "block" }}
            >
              {item.value.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: item.trend.startsWith("+") ? "#2ecc71" : "#e74c3c",
                fontSize: "0.6rem",
              }}
            >
              {item.trend}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ConversionChart;
