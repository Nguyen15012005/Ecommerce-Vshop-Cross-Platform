import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  MoreVert,
  SortOutlined,
  CloudUpload,
  Close,
  DeleteOutline,
  Layers,
  Collections,
  ChevronLeft,
  ChevronRight,
  Style,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createSellerProduct,
  fetchSellerProducts,
  updateSellerProduct,
} from "../../../store/sellerSlice";

const initialProducts = [
  {
    id: 1,
    name: "Nike Air Zoom Pegasus 39",
    category: "Giày chạy bộ",
    sku: "NK-P39-RED-42",
    price: "2450000",
    stock: 142,
    status: "ĐANG BÁN",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=400",
    ],
    variants: [
      { type: "Màu sắc/Size", value: "Đỏ - 42", stock: 50 },
      { type: "Màu sắc/Size", value: "Đen - 42", stock: 42 },
      { type: "Màu sắc/Size", value: "Xanh - 41", stock: 50 },
    ],
    description:
      "Giày chạy bộ nhẹ, êm ái, với đệm Air Zoom phản hồi tốt, phù hợp cho việc tập luyện hàng ngày.",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless",
    category: "Phụ kiện số",
    sku: "SNY-XM5-BLK",
    price: "8990000",
    stock: 5,
    status: "SẮP HẾT",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
    ],
    variants: [
      { type: "Màu sắc", value: "Đen nhám", stock: 3 },
      { type: "Màu sắc", value: "Trắng bạc", stock: 2 },
    ],
    description:
      "Tai nghe chống ồn đỉnh cao từ Sony, âm thanh độ phân giải cao và thời lượng pin ấn tượng.",
  },
  {
    id: 3,
    name: "Minimalist Quartz Watch",
    category: "Thời trang",
    sku: "WTCH-MIN-01",
    price: "1200000",
    stock: 45,
    status: "ĐANG BÁN",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1526045431048-f857369aba09?auto=format&fit=crop&q=80&w=400",
    ],
    variants: [
      { type: "Màu sắc", value: "Vàng hồng", stock: 20 },
      { type: "Màu sắc", value: "Bạc", stock: 25 },
    ],
    description:
      "Đồng hồ phong cách tối giản, mặt kính chống trầy, phù hợp cho mọi trang phục công sở.",
  },
  {
    id: 4,
    name: "Aviator Gold Sunglasses",
    category: "Thời trang",
    sku: "SUN-AVT-G",
    price: "3500000",
    stock: 0,
    status: "HẾT HÀNG",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
    ],
    variants: [{ type: "Màu sắc", value: "Gương Vàng", stock: 0 }],
    description:
      "Kính phi công mạ vàng 18K cao cấp, tròng kính polarized chống tia UV tuyệt đối.",
  },
];

const mapApiProductToUi = (product) => {
  const stock = product.quantity ?? 0;
  return {
    id: product.id,
    name: product.title || "",
    category: product.category?.categoryId || "Thời trang",
    sku: `PRD-${product.id}`,
    price: String(product.sellingPrice || 0),
    stock,
    status: stock === 0 ? "HẾT HÀNG" : stock <= 10 ? "SẮP HẾT" : "ĐANG BÁN",
    images: Array.isArray(product.images) ? product.images : [],
    variants: [
      {
        type: "Biến thể",
        value: product.sizes || product.color || "Mặc định",
        stock,
      },
    ],
    description: product.description || "",
    raw: product,
  };
};

const mapUiProductToApi = (product) => ({
  title: product.name,
  description: product.description,
  mrpPrice: Number(product.price || 0),
  sellingPrice: Number(product.price || 0),
  quantity: Number(product.stock || 0),
  color: product.variants?.[0]?.value || "Mặc định",
  images: Array.isArray(product.images) ? product.images : [],
  category: product.category || "fashion",
  category2: product.category || "fashion",
  category3: product.category || "fashion",
  size: product.variants?.map((variant) => variant.value).join(", ") || "FREE",
});

const ProductList = () => {
  const dispatch = useDispatch();
  const { products: sellerProducts } = useSelector((state) => state.seller);
  const [productList, setProductList] = useState(() => {
    const savedProducts = localStorage.getItem("seller_products_v3");
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("seller_products_v3", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  useEffect(() => {
    if (sellerProducts.length > 0) {
      setProductList(sellerProducts.map(mapApiProductToUi));
    }
  }, [sellerProducts]);

  // Dialog State
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    category: "Thời trang",
    sku: "",
    price: "",
    stock: 0,
    description: "",
    images: [],
    variants: [{ type: "Màu sắc/Size", value: "", stock: 0 }],
  });

  const fileInputRef = useRef(null);

  const handleOpenAdd = () => {
    setCurrentProduct({
      name: "",
      category: "Thời trang",
      sku: `SKU-${Math.floor(Math.random() * 10000)}`,
      price: "",
      stock: 0,
      description: "",
      images: [],
      variants: [{ type: "Biến thể", value: "", stock: 0 }],
    });
    setAddDialogOpen(true);
  };

  const handleOpenEdit = (product) => {
    setCurrentProduct({ ...product });
    setEditDialogOpen(true);
  };

  const handleSave = async (isEdit) => {
    if (!currentProduct.name || !currentProduct.price) {
      alert("Vui lòng nhập tên và giá sản phẩm!");
      return;
    }

    // Calculate total stock from variants
    const totalStock = currentProduct.variants.reduce(
      (sum, v) => sum + (parseInt(v.stock) || 0),
      0,
    );
    const updatedProduct = {
      ...currentProduct,
      stock: totalStock,
      status: getStatusInfo(totalStock).label,
    };
    const apiProduct = mapUiProductToApi(updatedProduct);

    if (isEdit) {
      if (updatedProduct.raw?.id) {
        try {
          const savedProduct = await dispatch(
          updateSellerProduct({
            productId: updatedProduct.id,
            product: {
              ...updatedProduct.raw,
              title: apiProduct.title,
              description: apiProduct.description,
              mrpPrice: apiProduct.mrpPrice,
              sellingPrice: apiProduct.sellingPrice,
              quantity: apiProduct.quantity,
              color: apiProduct.color,
              images: apiProduct.images,
              sizes: apiProduct.size,
            },
          }),
          ).unwrap();

          setProductList((prev) =>
            prev.map((p) =>
              p.id === updatedProduct.id ? mapApiProductToUi(savedProduct) : p,
            ),
          );
        } catch (error) {
          alert(error || "Không thể cập nhật sản phẩm.");
          return;
        }
      } else {
        setProductList((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
        );
      }
      setEditDialogOpen(false);
    } else {
      try {
        const createdProduct = await dispatch(createSellerProduct(apiProduct)).unwrap();
        setProductList((prev) => [mapApiProductToUi(createdProduct), ...prev]);
        setAddDialogOpen(false);
      } catch (error) {
        alert(error || "Không thể tạo sản phẩm.");
      }
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (currentProduct.images.length + files.length > 5) {
      alert("Tối đa 5 hình ảnh!");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setCurrentProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addVariant = () => {
    setCurrentProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { type: "Biến thể", value: "", stock: 0 }],
    }));
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...currentProduct.variants];
    newVariants[index][field] = value;
    setCurrentProduct((prev) => ({ ...prev, variants: newVariants }));
  };

  const removeVariant = (index) => {
    if (currentProduct.variants.length === 1) return;
    setCurrentProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const getStatusInfo = (stock) => {
    if (stock === 0) return { label: "HẾT HÀNG", color: "#e74c3c" };
    if (stock <= 10) return { label: "SẮP HẾT", color: "#f1c40f" };
    return { label: "ĐANG BÁN", color: "#2ecc71" };
  };

  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    let matchesPrice = true;
    const price = parseInt(product.price);
    if (priceRangeFilter === "low") matchesPrice = price < 1000000;
    else if (priceRangeFilter === "mid")
      matchesPrice = price >= 1000000 && price <= 5000000;
    else if (priceRangeFilter === "high")
      matchesPrice = price > 5000000 && price <= 10000000;
    else if (priceRangeFilter === "luxury") matchesPrice = price > 10000000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#111" }}>
            Quản lý kho hàng
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Quản lý biến thể, hình ảnh và tồn kho thông minh.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAdd}
          sx={{
            bgcolor: "#111",
            color: "#fff",
            alignSelf: { xs: "stretch", sm: "auto" },
            flexShrink: 0,
            borderRadius: "12px",
            px: 3,
            py: 1.5,
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
          Thêm sản phẩm mới
        </Button>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          bgcolor: "#fff",
          p: 2,
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
        }}
      >
        <TextField
          placeholder="Tìm kiếm..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: "#9ca3af", mr: 1 }} />,
          }}
          sx={{
            minWidth: { xs: "100%", md: 280 },
            flex: "1 1 320px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#f9fafb",
            },
          }}
        />
        <FormControl
          size="small"
          sx={{ minWidth: { xs: "100%", sm: 200 }, flex: "0 1 220px" }}
        >
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="all">Tất cả danh mục</MenuItem>
            <MenuItem value="Giày chạy bộ">Giày chạy bộ</MenuItem>
            <MenuItem value="Phụ kiện số">Phụ kiện số</MenuItem>
            <MenuItem value="Thời trang">Thời trang</MenuItem>
            <MenuItem value="Hành lý">Hành lý</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ minWidth: { xs: "100%", sm: 200 }, flex: "0 1 220px" }}
        >
          <Select
            value={priceRangeFilter}
            onChange={(e) => setPriceRangeFilter(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="all">Mọi mức giá</MenuItem>
            <MenuItem value="low">Dưới 1.000.000₫</MenuItem>
            <MenuItem value="mid">1.000.000₫ - 5.000.000₫</MenuItem>
            <MenuItem value="high">5.000.000₫ - 10.000.000₫</MenuItem>
            <MenuItem value="luxury">Trên 10.000.000₫</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => {
          const status = getStatusInfo(product.stock);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #eee",
                  boxShadow: "none",
                  position: "relative",
                  height: "100%",
                  minHeight: 430,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Box
                  sx={{ position: "relative", pt: "100%", bgcolor: "#f5f5f5" }}
                >
                  <Box
                    component="img"
                    src={product.images[0] || "https://via.placeholder.com/400"}
                    sx={{
                      position: "absolute",
                      top: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {product.images.length > 1 && (
                    <Chip
                      icon={
                        <Collections sx={{ fontSize: "12px !important" }} />
                      }
                      label={`+${product.images.length - 1}`}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        bgcolor: "rgba(255,255,255,0.8)",
                        fontSize: "10px",
                      }}
                    />
                  )}
                  <Chip
                    label={status.label}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      bgcolor: "#fff",
                      color: status.color,
                      fontWeight: 800,
                      fontSize: "10px",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: "rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "0.3s",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleOpenEdit(product)}
                      sx={{
                        bgcolor: "#fff",
                        color: "#111",
                        "&:hover": { bgcolor: "#f0f0f0" },
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    minHeight: 170,
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#002060",
                      fontWeight: 800,
                      display: "block",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.category}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      mb: 0.5,
                      minHeight: 48,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{
                      mb: 1.5,
                      minHeight: 24,
                      maxHeight: 50,
                      overflow: "hidden",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {(Array.isArray(product.variants) ? product.variants : [])
                      .slice(0, 2)
                      .map((v, i) => (
                      <Chip
                        key={i}
                        label={v.value}
                        size="small"
                        variant="outlined"
                        sx={{
                          maxWidth: "100%",
                          fontSize: "10px",
                          height: "20px",
                          "& .MuiChip-label": {
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                      />
                    ))}
                    {(product.variants?.length || 0) > 2 && (
                      <Typography variant="caption">
                        +{product.variants.length - 2}
                      </Typography>
                    )}
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      mt: "auto",
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {Number(product.price).toLocaleString("vi-VN")}₫
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        flexShrink: 0,
                        bgcolor: "#f0f4ff",
                        px: 1,
                        borderRadius: "4px",
                        fontWeight: 700,
                      }}
                    >
                      Kho: {product.stock}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Unified Dialog for Add/Edit */}
      <Dialog
        open={addDialogOpen || editDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
          setEditDialogOpen(false);
        }}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { borderRadius: "24px" } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          {addDialogOpen ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
          <IconButton
            onClick={() => {
              setAddDialogOpen(false);
              setEditDialogOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={4}>
            {/* Left: Images & Info */}
            <Grid item xs={12} md={5}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Collections fontSize="small" /> Thư viện ảnh (Tối đa 5)
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1,
                  mb: 3,
                }}
              >
                {currentProduct.images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      pt: "100%",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      sx={{
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeImage(index)}
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        bgcolor: "rgba(255,255,255,0.8)",
                        "&:hover": { bgcolor: "#ff4d4f", color: "#fff" },
                      }}
                    >
                      <Close sx={{ fontSize: 12 }} />
                    </IconButton>
                  </Box>
                ))}
                {currentProduct.images.length < 5 && (
                  <Box
                    onClick={() => fileInputRef.current.click()}
                    sx={{
                      pt: "100%",
                      borderRadius: "12px",
                      border: "2px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      "&:hover": { borderColor: "#002060", bgcolor: "#f0f4ff" },
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      <Add color="action" />
                    </Box>
                  </Box>
                )}
              </Box>
              <input
                type="file"
                hidden
                multiple
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
              />

              <Stack spacing={2.5}>
                <TextField
                  label="Tên sản phẩm"
                  fullWidth
                  size="small"
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                />
                <FormControl fullWidth size="small">
                  <Select
                    value={currentProduct.category}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        category: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Giày chạy bộ">Giày chạy bộ</MenuItem>
                    <MenuItem value="Phụ kiện số">Phụ kiện số</MenuItem>
                    <MenuItem value="Thời trang">Thời trang</MenuItem>
                    <MenuItem value="Hành lý">Hành lý</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Giá bán (₫)"
                  fullWidth
                  size="small"
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Mô tả"
                  fullWidth
                  multiline
                  rows={3}
                  value={currentProduct.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Stack>
            </Grid>

            {/* Right: Variants */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Style fontSize="small" /> Quản lý biến thể (Màu sắc, Size...)
                </Typography>
                <Button
                  startIcon={<Add />}
                  size="small"
                  onClick={addVariant}
                  sx={{ textTransform: "none" }}
                >
                  Thêm dòng
                </Button>
              </Box>

              <Box sx={{ maxHeight: "400px", overflowY: "auto", pr: 1 }}>
                {currentProduct.variants.map((variant, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      borderRadius: "12px",
                      border: "1px solid #f0f0f0",
                      bgcolor: "#fafafa",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TextField
                        label="Giá trị (VD: Đỏ - XL)"
                        size="small"
                        sx={{ flexGrow: 1 }}
                        value={variant.value}
                        onChange={(e) =>
                          updateVariant(index, "value", e.target.value)
                        }
                      />
                      <TextField
                        label="Tồn kho"
                        size="small"
                        type="number"
                        sx={{ width: 100 }}
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariant(index, "stock", e.target.value)
                        }
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeVariant(index)}
                        disabled={currentProduct.variants.length === 1}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{ mt: 3, p: 2, bgcolor: "#f0f4ff", borderRadius: "12px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#002060" }}
                >
                  Tổng tồn kho:{" "}
                  {currentProduct.variants.reduce(
                    (sum, v) => sum + (parseInt(v.stock) || 0),
                    0,
                  )}{" "}
                  sản phẩm
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setEditDialogOpen(false);
            }}
            sx={{ fontWeight: 700, color: "#666" }}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSave(editDialogOpen)}
            sx={{
              bgcolor: "#002060",
              px: 4,
              borderRadius: "12px",
              fontWeight: 700,
            }}
          >
            {addDialogOpen ? "Tạo sản phẩm" : "Lưu thay đổi"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
