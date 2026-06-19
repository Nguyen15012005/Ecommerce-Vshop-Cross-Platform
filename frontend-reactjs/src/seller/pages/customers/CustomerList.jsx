import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  TextField, 
  InputAdornment, 
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Pagination,
  Checkbox,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from '@mui/material';
import { 
  Search, 
  CalendarToday, 
  FilterList, 
  MoreVert, 
  Phone, 
  Mail,
  FiberManualRecord,
  Close,
  ShoppingCart,
  LocationOn
} from '@mui/icons-material';

const customersData = [
  { 
    id: 'KH-2840', 
    name: 'Lê Thị Thanh', 
    phone: '0901234567', 
    email: 'thanh.le@gmail.com', 
    joinedDate: '2023-05-12', 
    orders: 24, 
    totalSpent: 12450000, 
    lastActive: '2024-05-24T14:30:00', // Giả sử hôm nay là 24/05/2024
    avatar: 'https://i.pravatar.cc/150?u=1',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    orderHistory: [
      { id: '#ORD-9428', date: '24/05/2024', amount: '1,250,000', status: 'Hoàn thành', items: 'Giày Nike Air Zoom, Tất thể thao' }
    ]
  },
  { 
    id: 'KH-2839', 
    name: 'Nguyễn Minh Quân', 
    phone: '0988776655', 
    email: 'quan.minh@example.vn', 
    joinedDate: '2024-01-01', 
    orders: 1, 
    totalSpent: 890000, 
    lastActive: '2024-05-23T10:00:00',
    avatar: 'https://i.pravatar.cc/150?u=2',
    address: '45 Nguyễn Huệ, Quận 1, TP.HCM',
    orderHistory: [
      { id: '#ORD-9427', date: '24/05/2024', amount: '890,000', status: 'Đang chuẩn bị', items: 'Tai nghe Sony WH-1000XM5' }
    ]
  },
  { 
    id: 'KH-2838', 
    name: 'Phạm Hoàng Nam', 
    phone: '0912334455', 
    email: 'nam.pham@outlook.com', 
    joinedDate: '2023-11-15', 
    orders: 5, 
    totalSpent: 3200000, 
    lastActive: '2024-05-19T08:00:00',
    avatar: 'https://i.pravatar.cc/150?u=3',
    address: '789 CMT8, Quận Tân Bình, TP.HCM',
    orderHistory: []
  },
  { 
    id: 'KH-2837', 
    name: 'Trần Diệu Nhi', 
    phone: '0933445566', 
    email: 'nhi.dieutran@gmail.com', 
    joinedDate: '2023-08-20', 
    orders: 18, 
    totalSpent: 9800000, 
    lastActive: '2024-05-24T09:00:00',
    avatar: 'https://i.pravatar.cc/150?u=4',
    address: '321 Võ Văn Kiệt, Quận 5, TP.HCM',
    orderHistory: []
  },
];

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastActiveFilter, setLastActiveFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Helper: Xác thực nhãn khách hàng dựa trên dữ liệu thực tế
  const getCustomerLabel = (customer) => {
    if (customer.totalSpent > 10000000) return { text: 'VIP', color: '#fef3c7', textColor: '#92400e' };
    if (customer.joinedDate.startsWith('2024')) return { text: 'MỚI', color: '#f0f9ff', textColor: '#0369a1' };
    if (customer.orders > 3) return { text: 'TIỀM NĂNG', color: '#f1f5f9', textColor: '#475569' };
    return null;
  };

  // Helper: Xác định trạng thái dựa trên thời gian hoạt động cuối
  const getCustomerStatus = (lastActiveStr) => {
    const lastActive = new Date(lastActiveStr);
    const now = new Date('2024-05-24T21:00:00'); // Giả lập thời điểm hiện tại
    const diffInHours = (now - lastActive) / (1000 * 60 * 60);
    
    if (diffInHours < 24) return { text: 'HOẠT ĐỘNG', color: '#ecfdf5', textColor: '#10b981' };
    return { text: 'VẮNG MẶT', color: '#f1f5f9', textColor: '#94a3b8' };
  };

  const isSelected = (id) => selectedIds.indexOf(id) !== -1;

  const handleMenuOpen = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetail = () => {
    setOpenDetail(true);
    handleMenuClose();
  };

  const handleOpenChat = () => {
    setOpenChat(true);
    handleMenuClose();
  };

  // Real-time filtering logic
  const filteredCustomers = customersData.filter(customer => {
    // Search query
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          customer.phone.includes(searchQuery);
    if (!matchesSearch) return false;

    // Last active status
    if (lastActiveFilter !== 'all') {
      const status = getCustomerStatus(customer.lastActive);
      if (lastActiveFilter === 'active' && status.text !== 'HOẠT ĐỘNG') return false;
      if (lastActiveFilter === 'inactive' && status.text !== 'VẮNG MẶT') return false;
    }

    // Date range
    if (startDate) {
      if (new Date(customer.joinedDate) < new Date(startDate)) return false;
    }
    if (endDate) {
      if (new Date(customer.joinedDate) > new Date(endDate)) return false;
    }

    return true;
  });

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(filteredCustomers.map(n => n.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = newSelected.concat(selectedIds, id);
    else newSelected = selectedIds.filter(item => item !== id);
    setSelectedIds(newSelected);
  };

  const handleExport = () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một khách hàng để xuất dữ liệu!');
      return;
    }
    const dataToExport = customersData.filter(c => selectedIds.includes(c.id));
    console.log('Exporting:', dataToExport);
    alert(`Đã xuất dữ liệu cho ${dataToExport.length} khách hàng được chọn.`);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
            Quản lý khách hàng
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Hệ thống tự động phân loại khách hàng dựa trên hành vi mua sắm thực tế.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            disabled={selectedIds.length === 0}
            onClick={handleExport}
            startIcon={<FilterList />}
            sx={{ 
              bgcolor: '#111', 
              color: '#fff',
              borderRadius: '10px', 
              textTransform: 'none',
              px: 3,
              transition: 'all 0.3s ease',
              '&:hover': { 
                bgcolor: '#C9A96E',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(201, 169, 110, 0.4)',
              },
              '&.Mui-disabled': { bgcolor: '#e2e8f0' }
            }}
          >
            Xuất dữ liệu ({selectedIds.length})
          </Button>
        </Stack>
      </Box>

      {/* Filters Card */}
      <Card sx={{ p: 3, mb: 3, borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={3}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
              TỪ NGÀY
            </Typography>
            <TextField 
              fullWidth 
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputProps={{ sx: { borderRadius: '10px' } }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
              ĐẾN NGÀY
            </Typography>
            <TextField 
              fullWidth 
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputProps={{ sx: { borderRadius: '10px' } }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
              TÌM KIẾM
            </Typography>
            <TextField 
              fullWidth 
              placeholder="Tên, mã, SĐT..." 
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{ 
                startAdornment: <Search sx={{ fontSize: 18, mr: 1, color: '#94a3b8' }} />,
                sx: { borderRadius: '10px' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
              TRẠNG THÁI
            </Typography>
            <TextField 
              select 
              fullWidth 
              size="small" 
              value={lastActiveFilter}
              onChange={(e) => setLastActiveFilter(e.target.value)}
              SelectProps={{ native: true }}
              sx={{ '& select': { borderRadius: '10px' } }}
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Vắng mặt</option>
            </TextField>
          </Grid>
        </Grid>
        
        {/* Filter Stats Bar */}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
            KẾT QUẢ: <strong>{filteredCustomers.length}</strong>
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
            ĐANG CHỌN: <strong>{selectedIds.length}</strong>
          </Typography>
          {(startDate || endDate || searchQuery || lastActiveFilter !== 'all') && (
            <Button 
              size="small" 
              sx={{ textTransform: 'none', fontWeight: 700, color: '#4338ca', ml: 'auto' }}
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setSearchQuery('');
                setLastActiveFilter('all');
              }}
            >
              Xóa bộ lọc
            </Button>
          )}
        </Box>
      </Card>

      {/* Table Card */}
      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox 
                    size="small" 
                    indeterminate={selectedIds.length > 0 && selectedIds.length < filteredCustomers.length}
                    checked={filteredCustomers.length > 0 && selectedIds.length === filteredCustomers.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>MÃ KH</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>KHÁCH HÀNG</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>LIÊN HỆ</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>NGÀY ĐĂNG KÝ</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>ĐƠN</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>TỔNG CHI TIÊU</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>TRẠNG THÁI</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const isItemSelected = isSelected(customer.id);
                const label = getCustomerLabel(customer);
                const status = getCustomerStatus(customer.lastActive);
                
                return (
                  <TableRow 
                    key={customer.id} 
                    hover 
                    selected={isItemSelected}
                    onClick={() => handleSelectOne(customer.id)}
                    sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        size="small" 
                        checked={isItemSelected}
                        onChange={() => handleSelectOne(customer.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>{customer.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar src={customer.avatar} sx={{ width: 40, height: 40, border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{customer.name}</Typography>
                          {label && (
                            <Chip 
                              label={label.text} 
                              size="small" 
                              sx={{ 
                                height: '18px', 
                                fontSize: '0.65rem', 
                                fontWeight: 900,
                                bgcolor: label.color,
                                color: label.textColor,
                                borderRadius: '4px'
                              }} 
                            />
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone sx={{ fontSize: 14, color: '#94a3b8' }} />
                          <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>{customer.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Mail sx={{ fontSize: 14, color: '#94a3b8' }} />
                          <Typography variant="caption" sx={{ color: '#475569' }}>{customer.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        {new Date(customer.joinedDate).toLocaleDateString('vi-VN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', bgcolor: '#f1f5f9', width: 'fit-content', px: 1, borderRadius: '4px' }}>
                        {customer.orders}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#4338ca' }}>
                        ₫{customer.totalSpent.toLocaleString('vi-VN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={<FiberManualRecord sx={{ fontSize: '10px !important' }} />}
                        label={status.text} 
                        size="small" 
                        sx={{ 
                          fontWeight: 700, 
                          borderRadius: '8px',
                          bgcolor: status.color,
                          color: status.textColor,
                          '& .MuiChip-icon': { color: status.textColor }
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, customer)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9' }}>
          <Typography variant="body2" color="textSecondary">
            Hiển thị 1 - 4 trên 2,840 khách hàng
          </Typography>
          <Pagination 
            count={10} 
            shape="rounded" 
            color="primary"
            sx={{ 
              '& .MuiPaginationItem-root': { borderRadius: '8px', fontWeight: 700 },
              '& .Mui-selected': { bgcolor: '#4338ca !important' }
            }} 
          />
        </Box>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', minWidth: '160px' }
        }}
      >
        <MenuItem onClick={handleViewDetail} sx={{ fontSize: '0.85rem', fontWeight: 600, gap: 1.5, py: 1 }}>
          <Search sx={{ fontSize: 18, color: '#64748b' }} /> Xem chi tiết
        </MenuItem>
        <MenuItem onClick={handleOpenChat} sx={{ fontSize: '0.85rem', fontWeight: 600, gap: 1.5, py: 1, color: '#4338ca' }}>
          <Mail sx={{ fontSize: 18, color: '#4338ca' }} /> Nhắn tin
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.85rem', fontWeight: 600, gap: 1.5, py: 1, color: '#ef4444' }}>
          <FiberManualRecord sx={{ fontSize: 10, color: '#ef4444' }} /> Chặn khách hàng
        </MenuItem>
      </Menu>

      {/* Customer Detail Dialog */}
      <Dialog 
        open={openDetail} 
        onClose={() => setOpenDetail(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '20px' } }}
      >
        {selectedCustomer && (
          <>
            <DialogTitle sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Chi tiết khách hàng</Typography>
              <IconButton onClick={() => setOpenDetail(false)}><Close /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0, borderTop: '1px solid #f1f5f9' }}>
              <Grid container>
                {/* Profile Side */}
                <Grid item xs={12} md={4} sx={{ p: 4, bgcolor: '#f8fafc', borderRight: '1px solid #f1f5f9' }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar src={selectedCustomer.avatar} sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{selectedCustomer.name}</Typography>
                    <Chip 
                      label={getCustomerLabel(selectedCustomer)?.text || 'TIÊU CHUẨN'} 
                      size="small" 
                      sx={{ mt: 1, fontWeight: 700, bgcolor: getCustomerLabel(selectedCustomer)?.color || '#f1f5f9' }} 
                    />
                  </Box>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>LIÊN HỆ</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Mail sx={{ fontSize: 16, color: '#94a3b8' }} />
                        <Typography variant="body2">{selectedCustomer.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Phone sx={{ fontSize: 16, color: '#94a3b8' }} />
                        <Typography variant="body2">{selectedCustomer.phone}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>ĐỊA CHỈ</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 0.5 }}>
                        <LocationOn sx={{ fontSize: 16, color: '#94a3b8', mt: 0.3 }} />
                        <Typography variant="body2">{selectedCustomer.address}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
                {/* Stats Side */}
                <Grid item xs={12} md={8} sx={{ p: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: '#64748b' }}>TÓM TẮT GIAO DỊCH</Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: '12px', border: '1px solid #dcfce7' }}>
                        <Typography variant="caption" sx={{ color: '#166534', fontWeight: 700 }}>TỔNG CHI TIÊU</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#15803d' }}>₫{selectedCustomer.totalSpent.toLocaleString('vi-VN')}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, bgcolor: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                        <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 700 }}>SỐ ĐƠN HÀNG</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1d4ed8' }}>{selectedCustomer.orders}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: '#64748b' }}>LỊCH SỬ ĐƠN HÀNG GẦN ĐÂY</Typography>
                  <TableContainer sx={{ border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: '#f8fafc' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem' }}>MÃ ĐƠN</TableCell>
                          <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem' }}>NGÀY</TableCell>
                          <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem' }}>SỐ TIỀN</TableCell>
                          <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem' }}>TRẠNG THÁI</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedCustomer.orderHistory.length > 0 ? selectedCustomer.orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                            <TableCell variant="caption">{order.date}</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>₫{order.amount}</TableCell>
                            <TableCell>
                              <Chip label={order.status} size="small" sx={{ fontSize: '0.65rem', height: '18px' }} />
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ py: 3, color: '#94a3b8' }}>Chưa có giao dịch nào</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Chat Mockup Dialog */}
      <Dialog 
        open={openChat} 
        onClose={() => setOpenChat(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '20px', height: '600px' } }}
      >
        {selectedCustomer && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={selectedCustomer.avatar} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{selectedCustomer.name}</Typography>
                <Typography variant="caption" color="#10b981">Đang trực tuyến</Typography>
              </Box>
              <IconButton onClick={() => setOpenChat(false)}><Close /></IconButton>
            </Box>
            
            <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f8fafc', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ alignSelf: 'flex-start', bgcolor: '#fff', p: 2, borderRadius: '0 12px 12px 12px', maxWidth: '80%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <Typography variant="body2">Chào shop, đơn hàng #ORD-9428 của mình bao giờ giao tới nơi vậy?</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block' }}>10:30 AM</Typography>
              </Box>
              <Box sx={{ alignSelf: 'flex-end', bgcolor: '#4338ca', color: '#fff', p: 2, borderRadius: '12px 12px 0 12px', maxWidth: '80%' }}>
                <Typography variant="body2">Chào bạn, đơn hàng của bạn đang được đơn vị vận chuyển lấy hàng, dự kiến sẽ tới trong 2-3 ngày tới nhé!</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5, display: 'block' }}>10:32 AM</Typography>
              </Box>
              <Box sx={{ alignSelf: 'flex-start', bgcolor: '#fff', p: 2, borderRadius: '0 12px 12px 12px', maxWidth: '80%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <Typography variant="body2">Oki cảm ơn shop nha.</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block' }}>10:33 AM</Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 1 }}>
              <TextField 
                fullWidth 
                placeholder="Nhập tin nhắn..." 
                size="small" 
                InputProps={{ sx: { borderRadius: '20px' } }}
              />
              <IconButton sx={{ bgcolor: '#4338ca', color: '#fff', '&:hover': { bgcolor: '#3730a3' } }}>
                <ShoppingCart sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};
export default CustomerList;
