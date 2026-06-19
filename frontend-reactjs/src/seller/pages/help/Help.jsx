import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Search,
  ExpandMore,
  Chat,
  Email,
  Phone,
  PlayCircleOutline,
  Description,
  QuestionAnswer,
  HelpOutline,
} from "@mui/icons-material";
import TopBar from "../../components/navbar/TopBar";

const faqs = [
  {
    question: "Làm thế nào để tạo mã giảm giá mới?",
    answer:
      "Bạn truy cập vào mục 'Mã giảm giá' ở menu bên trái, chọn 'Tạo mã mới'. Điền đầy đủ thông tin về tên mã, giá trị giảm, điều kiện đơn hàng và thời gian áp dụng, sau đó nhấn 'Lưu'.",
  },
  {
    question: "Quy trình rút tiền từ ví người bán như thế nào?",
    answer:
      "Tiền từ các đơn hàng thành công sẽ được chuyển vào ví người bán. Bạn có thể thực hiện rút tiền về tài khoản ngân hàng đã liên kết trong mục 'Cài đặt thanh toán'. Thời gian xử lý thường từ 1-3 ngày làm việc.",
  },
  {
    question: "Làm sao để thay đổi đơn vị vận chuyển?",
    answer:
      "Trong mục 'Cài đặt' -> 'Vận chuyển', bạn có thể bật/tắt các đơn vị vận chuyển mà shop muốn hợp tác. Lưu ý việc thay đổi này sẽ áp dụng cho các đơn hàng mới phát sinh.",
  },
  {
    question: "Xử lý như thế nào khi khách hàng yêu cầu hoàn tiền?",
    answer:
      "Bạn sẽ nhận được thông báo trong mục 'Đơn hàng'. Bạn cần kiểm tra lý do hoàn tiền và bằng chứng từ khách hàng. Nếu hợp lệ, hãy nhấn 'Đồng ý hoàn tiền'. Nếu không, bạn có thể 'Khiếu nại' để sàn thương mại can thiệp.",
  },
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pb: 10 }}>
      <TopBar hideSearch={true} />

      <Box sx={{ px: 4 }}>
        {/* Header Section */}
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            bgcolor: "#111",
            color: "#fff",
            borderRadius: "32px",
            mb: 6,
            backgroundImage: "linear-gradient(45deg, #111 0%, #222 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              bgcolor: "rgba(201, 169, 110, 0.1)",
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: "-1px" }}>
            Trung Tâm Trợ Giúp <span style={{ color: "#C9A96E" }}>DailyZone</span>
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)", mb: 4, fontWeight: 500 }}>
            Chào bạn, chúng tôi có thể giúp gì cho bạn hôm nay?
          </Typography>
          <TextField
            placeholder="Tìm kiếm hướng dẫn, câu hỏi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: 600,
              bgcolor: "#fff",
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#C9A96E" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Main Content: FAQs */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <QuestionAnswer sx={{ color: "#C9A96E" }} /> Câu hỏi thường gặp
              </Typography>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    mb: 2,
                    borderRadius: "16px !important",
                    border: "1px solid #EAEAEA",
                    boxShadow: "none",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary expandMore={<ExpandMore />}>
                    <Typography sx={{ fontWeight: 700, py: 1 }}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: "1px solid #F5F5F5", py: 3 }}>
                    <Typography sx={{ color: "#666", lineHeight: 1.7 }}>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, mt: 6, display: "flex", alignItems: "center", gap: 1.5 }}>
              <Description sx={{ color: "#C9A96E" }} /> Tài liệu quan trọng cho người bán
            </Typography>
            <Grid container spacing={3}>
              {[
                { title: "Chính sách người bán 2024", size: "1.2 MB", type: "PDF" },
                { title: "Quy chuẩn đóng gói & vận chuyển", size: "2.5 MB", type: "PDF" },
                { title: "Hướng dẫn sử dụng công cụ Marketing", size: "4.8 MB", type: "PPTX" },
                { title: "Quy định về hình ảnh sản phẩm", size: "850 KB", type: "PDF" },
                { title: "Biểu phí dịch vụ & hoa hồng", size: "500 KB", type: "DOCX" },
                { title: "Chính sách bảo mật thông tin", size: "1.1 MB", type: "PDF" },
              ].map((doc, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Card 
                    sx={{ 
                      p: 3, 
                      borderRadius: "20px", 
                      border: "1px solid #EAEAEA", 
                      boxShadow: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#C9A96E",
                        bgcolor: "rgba(201, 169, 110, 0.05)",
                        transform: "translateY(-2px)"
                      }
                    }}
                  >
                    <Avatar sx={{ bgcolor: "rgba(201, 169, 110, 0.1)", color: "#C9A96E" }}>
                      <Description />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{doc.title}</Typography>
                      <Typography variant="caption" color="textSecondary">{doc.type} • {doc.size}</Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar: Contact & Resources */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, borderRadius: "28px", border: "1px solid #EAEAEA", boxShadow: "none", mb: 4, position: "relative", overflow: "hidden" }}>
              <Box sx={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", bgcolor: "#C9A96E" }} />
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Liên hệ hỗ trợ</Typography>
              <Stack spacing={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "rgba(201, 169, 110, 0.1)", color: "#C9A96E" }}>
                    <Chat />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Chat trực tuyến</Typography>
                    <Typography variant="caption" color="textSecondary">Hỗ trợ 24/7 (Phản hồi trong 2p)</Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ ml: "auto", borderRadius: "10px", color: "#C9A96E", borderColor: "#C9A96E" }}>Chat ngay</Button>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "rgba(39, 174, 96, 0.1)", color: "#27AE60" }}>
                    <Phone />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Hotline 1900 8888</Typography>
                    <Typography variant="caption" color="textSecondary">8:00 - 22:00 hàng ngày</Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "rgba(44, 62, 80, 0.1)", color: "#2C3E50" }}>
                    <Email />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Email Support</Typography>
                    <Typography variant="caption" color="textSecondary">support@dailyzone.vn</Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Help;
