import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Điện tử", value: 1200000, color: "#C9A96E" },
  { name: "Thời trang", value: 950000, color: "#FFB84D" },
  { name: "Nhà cửa", value: 750000, color: "#FFE0B3" },
  { name: "Làm đẹp", value: 500000, color: "#FFF2E6" },
];

const CategoryChart = () => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Top danh mục
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#C9A96E", fontWeight: 700, cursor: "pointer" }}
        >
          Xem tất cả
        </Typography>
      </Box>

      <Box sx={{ height: 200, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            Tổng doanh số
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            ₫3,4tr
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3, spaceY: 1.5 }}>
        {data.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "2px",
                  bgcolor: item.color,
                }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "gray" }}
              >
                {item.name}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              ₫{(item.value / 1000000).toFixed(1)}tr
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryChart;
