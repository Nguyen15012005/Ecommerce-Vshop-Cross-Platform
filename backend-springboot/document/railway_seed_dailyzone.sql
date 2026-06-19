-- DailyZone seed data for Railway MySQL/MariaDB.
-- Run this after Hibernate has created/updated the schema.
-- Seller login seed: seller@dailyzone.com / password

START TRANSACTION;

INSERT IGNORE INTO address (id, address, city, locality, name, phone, pin_code, state)
VALUES
  (1001, '12 Nguyen Hue, Ben Nghe', 'Ho Chi Minh', 'District 1', 'DailyZone Official Warehouse', '0909000001', '700000', 'Ho Chi Minh');

INSERT IGNORE INTO seller (
  id,
  account_status,
  account_holder_name,
  account_number,
  ifsc_code,
  business_address,
  business_email,
  business_name,
  business_phone,
  banner,
  logo,
  email,
  is_email_verified,
  gstin,
  password,
  phone,
  role,
  seller_name,
  pickup_address_id
)
VALUES (
  1001,
  'ACTIVE',
  'DailyZone Official Store',
  '0123456789',
  'VCB0001',
  '12 Nguyen Hue, District 1, Ho Chi Minh',
  'seller@dailyzone.com',
  'DailyZone Official Store',
  '0909000001',
  '/assets/image/men_hero.jpg',
  '/assets/image/logo.png',
  'seller@dailyzone.com',
  1,
  'DZ-SEED-001',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  '0909000001',
  'SELLER',
  'DailyZone Official Store',
  1001
);

INSERT IGNORE INTO seller_report (
  id,
  canceled_orders,
  net_earnings,
  total_earnings,
  total_orders,
  total_refunds,
  total_sales,
  total_tax,
  total_transactions,
  seller_id
)
VALUES (1001, 0, 0, 0, 0, 0, 0, 0, 0, 1001);

INSERT IGNORE INTO category (id, category_id, level, name, parent_category_id)
VALUES
  (1001, 'men', 1, 'Men', NULL),
  (1002, 'women', 1, 'Women', NULL),
  (1003, 'electronics', 1, 'Electronics', NULL),
  (1004, 'home_furnitures', 1, 'Home Furnitures', NULL);

INSERT IGNORE INTO category (id, category_id, level, name, parent_category_id)
VALUES
  (1011, 'men_topwear', 2, 'Ao nam', 1001),
  (1012, 'men_bottomwear', 2, 'Quan nam', 1001),
  (1013, 'men_footwear', 2, 'Giay dep nam', 1001),
  (1014, 'men_fashion_accessories', 2, 'Phu kien nam', 1001),
  (1021, 'women_fashion', 2, 'Thoi trang nu', 1002),
  (1022, 'women_footwear', 2, 'Giay dep nu', 1002),
  (1023, 'women_bags_wallets', 2, 'Tui xach va vi nu', 1002),
  (1024, 'women_beauty', 2, 'Lam dep', 1002),
  (1031, 'mobiles', 2, 'Dien thoai', 1003),
  (1032, 'laptops', 2, 'Laptop va may tinh', 1003),
  (1033, 'mobile_accessories', 2, 'Phu kien dien thoai', 1003),
  (1034, 'speakers', 2, 'Tai nghe, loa va am thanh', 1003),
  (1035, 'smart_wearable_tech', 2, 'Thiet bi deo thong minh', 1003),
  (1041, 'bed_linen_furnishing', 2, 'Chan ga goi', 1004),
  (1042, 'lamps_lighting', 2, 'Den va chieu sang', 1004),
  (1043, 'home_decor', 2, 'Trang tri nha', 1004),
  (1044, 'kitchen_table', 2, 'Nha bep va ban an', 1004);

INSERT IGNORE INTO category (id, category_id, level, name, parent_category_id)
VALUES
  (1111, 'men_t_shirts', 3, 'Ao thun nam', 1011),
  (1112, 'men_casual_shirts', 3, 'Ao so mi nam', 1011),
  (1113, 'men_jackets', 3, 'Ao khoac nam', 1011),
  (1121, 'men_jeans', 3, 'Quan jean nam', 1012),
  (1122, 'men_track_pants_and_joggers', 3, 'Quan jogger nam', 1012),
  (1131, 'men_sneakers', 3, 'Giay sneaker nam', 1013),
  (1132, 'men_formal_shoes', 3, 'Giay tay nam', 1013),
  (1141, 'men_watches', 3, 'Dong ho nam', 1014),
  (1211, 'women_dresses', 3, 'Dam nu', 1021),
  (1212, 'women_tops', 3, 'Ao nu', 1021),
  (1213, 'women_skirts', 3, 'Chan vay', 1021),
  (1221, 'women_heels', 3, 'Giay cao got', 1022),
  (1222, 'women_sneakers', 3, 'Giay the thao nu', 1022),
  (1231, 'women_bags', 3, 'Tui xach nu', 1023),
  (1241, 'women_skincare', 3, 'Cham soc da', 1024),
  (1311, 'apple_mobile', 3, 'iPhone', 1031),
  (1312, 'samsung_mobile', 3, 'Dien thoai Samsung', 1031),
  (1321, 'gaming_laptops', 3, 'Laptop gaming', 1032),
  (1322, 'mouse', 3, 'Chuot may tinh', 1032),
  (1331, 'headphones_headsets', 3, 'Tai nghe', 1033),
  (1332, 'power_banks', 3, 'Sac du phong', 1033),
  (1341, 'bluetooth_speakers', 3, 'Loa Bluetooth', 1034),
  (1351, 'smart_watches', 3, 'Dong ho thong minh', 1035),
  (1411, 'bedding_sets', 3, 'Bo chan ga', 1041),
  (1412, 'pillows_pillow_covers', 3, 'Goi va vo goi', 1041),
  (1421, 'table_lamps', 3, 'Den ban', 1042),
  (1422, 'floor_lamps', 3, 'Den dung', 1042),
  (1431, 'clocks', 3, 'Dong ho treo tuong', 1043),
  (1432, 'wall_decor', 3, 'Tranh treo tuong', 1043),
  (1441, 'cups_mugs', 3, 'Ly va coc', 1044),
  (1442, 'bakeware_cookware', 3, 'Dung cu nau an', 1044);

INSERT INTO product (
  id, title, description, mrp_price, selling_price, discount_percent,
  quantity, color, num_ratings, created_at, sizes, category_id, seller_id
)
SELECT * FROM (
  SELECT 2001, 'Ao thun nam cotton oversize DailyZone', 'Ao thun cotton 100%, form rong, thoang mat, phu hop mac hang ngay.', 399000, 299000, 25, 120, 'Trang', 128, NOW(), 'M,L,XL', 1111, 1001
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2001);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2002, 'Ao so mi nam Oxford regular fit', 'Ao so mi Oxford vai day vua, dung form, de phoi cong so hoac casual.', 590000, 429000, 27, 90, 'Xanh duong', 84, NOW(), 'M,L,XL', 1112, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2002);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2003, 'Ao khoac denim nam wash vintage', 'Ao khoac denim wash nhe, chat vai ben, phong cach streetwear.', 850000, 649000, 23, 55, 'Xanh duong', 73, NOW(), 'M,L,XL', 1113, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2003);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2004, 'Quan jean nam slim fit co gian', 'Quan jean nam slim fit, co gian nhe, mau xanh de phoi do.', 699000, 499000, 28, 100, 'Xanh navy', 101, NOW(), '29,30,31,32,34', 1121, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2004);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2005, 'Giay sneaker nam trang de em', 'Giay sneaker trang, de cao su em chan, hop di hoc di lam.', 950000, 699000, 26, 75, 'Trang', 214, NOW(), '40,41,42,43', 1131, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2005);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2006, 'Dam midi hoa nhe that eo', 'Dam midi hoa nhe, dang that eo, phu hop di choi va du tiec nhe.', 620000, 459000, 26, 70, 'Hong', 188, NOW(), 'S,M,L', 1211, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2006);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2007, 'Ao kieu nu linen tay phong', 'Ao kieu linen nhe mat, tay phong nhe, phoi tot voi quan jean hoac chan vay.', 450000, 329000, 26, 85, 'Kem', 136, NOW(), 'S,M,L', 1212, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2007);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2008, 'Tui xach nu cong so da PU', 'Tui xach nu da PU mem, nhieu ngan, phu hop di lam.', 690000, 469000, 32, 65, 'Nau', 205, NOW(), 'FREE', 1231, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2008);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2009, 'Giay cao got block heel 5cm', 'Giay cao got block heel vung chan, thiet ke thanh lich cho cong so.', 850000, 599000, 29, 40, 'Den', 167, NOW(), '36,37,38,39', 1221, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2009);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2010, 'iPhone 15 128GB chinh hang', 'iPhone 15 128GB, man hinh Super Retina XDR, camera 48MP.', 22990000, 19990000, 13, 25, 'Den', 312, NOW(), '128GB', 1311, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2010);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2011, 'Samsung Galaxy S24 256GB', 'Samsung Galaxy S24 256GB, man hinh AMOLED, hieu nang cao.', 23990000, 18990000, 20, 30, 'Xam', 276, NOW(), '256GB', 1312, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2011);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2012, 'Laptop gaming RTX 4060 16GB RAM', 'Laptop gaming 15.6 inch 144Hz, RTX 4060, RAM 16GB, SSD 512GB.', 29990000, 24990000, 16, 18, 'Den', 95, NOW(), '15.6 inch', 1321, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2012);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2013, 'Tai nghe Bluetooth ANC Pro', 'Tai nghe Bluetooth chong on chu dong, pin 30 gio, am thanh Hi-Fi.', 1890000, 1290000, 31, 120, 'Den', 331, NOW(), 'FREE', 1331, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2013);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2014, 'Sac du phong 20000mAh PD 22.5W', 'Sac du phong dung luong 20000mAh, sac nhanh PD, 2 cong USB-A va 1 cong USB-C.', 790000, 590000, 25, 140, 'Trang', 289, NOW(), '20000mAh', 1332, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2014);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2015, 'Dong ho thong minh AMOLED GPS', 'Smartwatch man hinh AMOLED, GPS, SpO2, chong nuoc IP68.', 3490000, 2490000, 28, 55, 'Den', 428, NOW(), 'FREE', 1351, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2015);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2016, 'Bo chan ga cotton lanh 4 mon', 'Bo chan ga goi cotton lanh mem min, thoang mat, gom 4 mon.', 1050000, 750000, 28, 60, 'Xanh la', 156, NOW(), 'Queen,King', 1411, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2016);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2017, 'Den ban LED cam ung 3 che do', 'Den ban LED cam ung, 3 che do anh sang, cong sac USB-C.', 550000, 399000, 27, 100, 'Vang', 224, NOW(), 'FREE', 1421, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2017);

INSERT INTO product (id, title, description, mrp_price, selling_price, discount_percent, quantity, color, num_ratings, created_at, sizes, category_id, seller_id)
SELECT * FROM (SELECT 2018, 'Dong ho treo tuong toi gian', 'Dong ho treo tuong phong cach toi gian, phu hop phong khach va phong lam viec.', 490000, 329000, 32, 80, 'Nau', 118, NOW(), 'FREE', 1431, 1001) AS seed
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2018);

INSERT INTO product_images (product_id, images)
SELECT 2001, 'https://images.pexels.com/photos/5868726/pexels-photo-5868726.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2001);
INSERT INTO product_images (product_id, images)
SELECT 2002, 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2002);
INSERT INTO product_images (product_id, images)
SELECT 2003, 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2003);
INSERT INTO product_images (product_id, images)
SELECT 2004, 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2004);
INSERT INTO product_images (product_id, images)
SELECT 2005, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2005);
INSERT INTO product_images (product_id, images)
SELECT 2006, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2006);
INSERT INTO product_images (product_id, images)
SELECT 2007, 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2007);
INSERT INTO product_images (product_id, images)
SELECT 2008, 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2008);
INSERT INTO product_images (product_id, images)
SELECT 2009, 'https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2009);
INSERT INTO product_images (product_id, images)
SELECT 2010, 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2010);
INSERT INTO product_images (product_id, images)
SELECT 2011, 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2011);
INSERT INTO product_images (product_id, images)
SELECT 2012, 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2012);
INSERT INTO product_images (product_id, images)
SELECT 2013, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2013);
INSERT INTO product_images (product_id, images)
SELECT 2014, 'https://images.pexels.com/photos/4526477/pexels-photo-4526477.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2014);
INSERT INTO product_images (product_id, images)
SELECT 2015, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2015);
INSERT INTO product_images (product_id, images)
SELECT 2016, 'https://images.pexels.com/photos/1267300/pexels-photo-1267300.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2016);
INSERT INTO product_images (product_id, images)
SELECT 2017, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2017);
INSERT INTO product_images (product_id, images)
SELECT 2018, 'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&w=500'
WHERE NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = 2018);

COMMIT;
