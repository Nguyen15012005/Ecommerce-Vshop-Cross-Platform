export const mainCategory = [
  // ================= NAM =================
  {
    name: "Nam",
    categoryId: "men",
    level: 1,
    levelTwoCategory: [
      {
        name: "Thời trang nam",
        categoryId: "men_fashion",
        parentCategoryId: "men",
        level: 2,
        levelThreeCategory: [
          "Áo thun",
          "Áo sơ mi",
          "Áo polo",
          "Áo khoác",
          "Quần jean",
          "Quần tây",
          "Quần short",
          "Đồ bộ",
        ],
      },
      {
        name: "Giày dép",
        categoryId: "men_footwear",
        parentCategoryId: "men",
        level: 2,
        levelThreeCategory: [
          "Giày sneaker",
          "Giày tây",
          "Giày thể thao",
          "Dép",
        ],
      },
      {
        name: "Phụ kiện",
        categoryId: "men_accessories",
        parentCategoryId: "men",
        level: 2,
        levelThreeCategory: [
          "Đồng hồ",
          "Thắt lưng",
          "Ví da",
          "Kính mát",
          "Túi xách",
        ],
      },
    ],
  },

  // ================= NỮ =================
  {
    name: "Nữ",
    categoryId: "women",
    level: 1,
    levelTwoCategory: [
      {
        name: "Thời trang nữ",
        categoryId: "women_fashion",
        parentCategoryId: "women",
        level: 2,
        levelThreeCategory: [
          "Áo nữ",
          "Áo thun",
          "Áo kiểu",
          "Đầm",
          "Chân váy",
          "Quần jean",
          "Đồ bộ",
        ],
      },
      {
        name: "Giày dép",
        categoryId: "women_footwear",
        parentCategoryId: "women",
        level: 2,
        levelThreeCategory: ["Giày cao gót", "Sneaker", "Sandal", "Dép"],
      },
      {
        name: "Làm đẹp",
        categoryId: "women_beauty",
        parentCategoryId: "women",
        level: 2,
        levelThreeCategory: ["Trang điểm", "Chăm sóc da", "Nước hoa"],
      },
      {
        name: "Túi xách & phụ kiện",
        categoryId: "women_accessories",
        parentCategoryId: "women",
        level: 2,
        levelThreeCategory: ["Túi xách", "Trang sức", "Đồng hồ", "Kính mát"],
      },
    ],
  },

  // ================= NHÀ CỬA =================
  {
    name: "Nhà cửa & Đời sống",
    categoryId: "home",
    level: 1,
    levelTwoCategory: [
      {
        name: "Nội thất",
        categoryId: "home_furniture",
        parentCategoryId: "home",
        level: 2,
        levelThreeCategory: ["Bàn ghế", "Sofa", "Giường", "Tủ"],
      },
      {
        name: "Nhà bếp",
        categoryId: "kitchen",
        parentCategoryId: "home",
        level: 2,
        levelThreeCategory: ["Dụng cụ nấu ăn", "Bàn ăn", "Đồ gia dụng"],
      },
      {
        name: "Trang trí",
        categoryId: "home_decor",
        parentCategoryId: "home",
        level: 2,
        levelThreeCategory: ["Đèn", "Tranh", "Cây trang trí"],
      },
    ],
  },

  // ================= ĐIỆN TỬ =================
  {
    name: "Điện tử",
    categoryId: "electronics",
    level: 1,
    levelTwoCategory: [
      {
        name: "Thiết bị",
        categoryId: "electronics_devices",
        parentCategoryId: "electronics",
        level: 2,
        levelThreeCategory: ["Điện thoại", "Laptop", "Tablet", "Tivi"],
      },
      {
        name: "Âm thanh",
        categoryId: "electronics_audio",
        parentCategoryId: "electronics",
        level: 2,
        levelThreeCategory: ["Tai nghe", "Loa"],
      },
      {
        name: "Phụ kiện",
        categoryId: "electronics_accessories",
        parentCategoryId: "electronics",
        level: 2,
        levelThreeCategory: ["Sạc", "Cáp", "Ốp lưng", "Chuột", "Bàn phím"],
      },
    ],
  },
];
