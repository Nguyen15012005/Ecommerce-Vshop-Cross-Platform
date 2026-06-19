package iuh.fit.backend.config;

import iuh.fit.backend.domain.AccountStatus;
import iuh.fit.backend.domain.UserRole;
import iuh.fit.backend.model.Address;
import iuh.fit.backend.model.BankDetails;
import iuh.fit.backend.model.BusinessDetails;
import iuh.fit.backend.model.Category;
import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.model.SellerReport;
import iuh.fit.backend.repository.CategoryRepository;
import iuh.fit.backend.repository.ProductRepository;
import iuh.fit.backend.repository.SellerReportRepository;
import iuh.fit.backend.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
public class DataSeeder implements CommandLineRunner {

    private static final String SELLER_EMAIL = "seller@dailyzone.com";

    private final SellerRepository sellerRepository;
    private final SellerReportRepository sellerReportRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Seller seller = seedSeller();
        seedSellerReport(seller);
        seedProducts(seller);
    }

    private Seller seedSeller() {
        Seller existingSeller = sellerRepository.findByEmail(SELLER_EMAIL);
        if (existingSeller != null) {
            return existingSeller;
        }

        Address address = new Address();
        address.setName("DailyZone Warehouse");
        address.setLocality("District 1");
        address.setAddress("12 Nguyen Hue");
        address.setCity("Ho Chi Minh");
        address.setState("Ho Chi Minh");
        address.setPinCode("700000");
        address.setPhone("0909000001");

        BusinessDetails businessDetails = new BusinessDetails();
        businessDetails.setBusinessName("DailyZone Official Store");
        businessDetails.setBusinessAddress("12 Nguyen Hue, District 1, Ho Chi Minh");
        businessDetails.setBusinessPhone("0909000001");
        businessDetails.setBusinessEmail(SELLER_EMAIL);
        businessDetails.setLogo("/assets/image/logo.png");
        businessDetails.setBanner("/assets/image/men_hero.jpg");

        BankDetails bankDetails = new BankDetails();
        bankDetails.setAccountHolderName("DailyZone Official Store");
        bankDetails.setAccountNumber("0123456789");
        bankDetails.setIfscCode("VCB0001");

        Seller seller = new Seller();
        seller.setSellerName("DailyZone Official Store");
        seller.setEmail(SELLER_EMAIL);
        seller.setPassword(passwordEncoder.encode("123456"));
        seller.setPhone("0909000001");
        seller.setPickupAddress(address);
        seller.setBusinessDetails(businessDetails);
        seller.setBankDetails(bankDetails);
        seller.setGSTIN("DZ-SEED-001");
        seller.setRole(UserRole.SELLER);
        seller.setEmailVerified(true);
        seller.setAccountStatus(AccountStatus.ACTIVE);

        return sellerRepository.save(seller);
    }

    private void seedSellerReport(Seller seller) {
        if (sellerReportRepository.findBySellerId(seller.getId()) != null) {
            return;
        }

        SellerReport report = new SellerReport();
        report.setSeller(seller);
        sellerReportRepository.save(report);
    }

    private void seedProducts(Seller seller) {
        if (productRepository.count() > 0) {
            return;
        }

        Category menTShirts = category("men_t_shirts", "Men T-Shirts", 3,
                category("men_topwear", "Men Topwear", 2,
                        category("men", "Men", 1, null)));
        Category menShirts = category("men_casual_shirts", "Men Casual Shirts", 3,
                category("men_topwear", "Men Topwear", 2,
                        category("men", "Men", 1, null)));
        Category menJackets = category("men_jackets", "Men Jackets", 3,
                category("men_topwear", "Men Topwear", 2,
                        category("men", "Men", 1, null)));
        Category menJeans = category("men_jeans", "Men Jeans", 3,
                category("men_bottomwear", "Men Bottomwear", 2,
                        category("men", "Men", 1, null)));
        Category menSneakers = category("men_sneakers", "Men Sneakers", 3,
                category("men_footwear", "Men Footwear", 2,
                        category("men", "Men", 1, null)));
        Category womenDresses = category("women_dresses", "Women Dresses", 3,
                category("women_fashion", "Women Fashion", 2,
                        category("women", "Women", 1, null)));
        Category womenTops = category("women_tops", "Women Tops", 3,
                category("women_fashion", "Women Fashion", 2,
                        category("women", "Women", 1, null)));
        Category womenBags = category("women_bags", "Women Bags", 3,
                category("women_bags_wallets", "Women Bags And Wallets", 2,
                        category("women", "Women", 1, null)));
        Category womenHeels = category("women_heels", "Women Heels", 3,
                category("women_footwear", "Women Footwear", 2,
                        category("women", "Women", 1, null)));
        Category appleMobile = category("apple_mobile", "iPhone", 3,
                category("mobiles", "Mobiles", 2,
                        category("electronics", "Electronics", 1, null)));
        Category samsungMobile = category("samsung_mobile", "Samsung Mobile", 3,
                category("mobiles", "Mobiles", 2,
                        category("electronics", "Electronics", 1, null)));
        Category gamingLaptops = category("gaming_laptops", "Gaming Laptops", 3,
                category("laptops", "Laptops", 2,
                        category("electronics", "Electronics", 1, null)));
        Category headphones = category("headphones_headsets", "Headphones", 3,
                category("mobile_accessories", "Mobile Accessories", 2,
                        category("electronics", "Electronics", 1, null)));
        Category powerBanks = category("power_banks", "Power Banks", 3,
                category("mobile_accessories", "Mobile Accessories", 2,
                        category("electronics", "Electronics", 1, null)));
        Category smartWatches = category("smart_watches", "Smart Watches", 3,
                category("smart_wearable_tech", "Smart Wearable Tech", 2,
                        category("electronics", "Electronics", 1, null)));
        Category beddingSets = category("bedding_sets", "Bedding Sets", 3,
                category("bed_linen_furnishing", "Bed Linen Furnishing", 2,
                        category("home_furnitures", "Home Furnitures", 1, null)));
        Category tableLamps = category("table_lamps", "Table Lamps", 3,
                category("lamps_lighting", "Lamps Lighting", 2,
                        category("home_furnitures", "Home Furnitures", 1, null)));
        Category clocks = category("clocks", "Clocks", 3,
                category("home_decor", "Home Decor", 2,
                        category("home_furnitures", "Home Furnitures", 1, null)));

        productRepository.saveAll(List.of(
                product(
                        seller,
                        menTShirts,
                        "Ao thun oversize cotton",
                        "Ao thun cotton form rong, thoang mat cho ngay he.",
                        399000,
                        299000,
                        120,
                        "Trang",
                        "M,L,XL",
                        List.of(
                                "https://images.pexels.com/photos/5868726/pexels-photo-5868726.jpeg?auto=compress&w=500",
                                "https://images.pexels.com/photos/8485550/pexels-photo-8485550.jpeg?auto=compress&w=500"
                        )
                ),
                product(
                        seller,
                        menShirts,
                        "Ao so mi nam Oxford regular fit",
                        "Ao so mi Oxford vai day vua, dung form, de phoi cong so hoac casual.",
                        590000,
                        429000,
                        90,
                        "Xanh duong",
                        "M,L,XL",
                        List.of("https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        menJackets,
                        "Ao khoac denim nam wash vintage",
                        "Ao khoac denim wash nhe, chat vai ben, phong cach streetwear.",
                        850000,
                        649000,
                        55,
                        "Xanh duong",
                        "M,L,XL",
                        List.of("https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        menJeans,
                        "Quan jean nam slim fit co gian",
                        "Quan jean nam slim fit, co gian nhe, mau xanh de phoi do.",
                        699000,
                        499000,
                        100,
                        "Xanh navy",
                        "29,30,31,32,34",
                        List.of("https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        menSneakers,
                        "Giay sneaker nam trang de em",
                        "Giay sneaker trang, de cao su em chan, hop di hoc di lam.",
                        950000,
                        699000,
                        75,
                        "Trang",
                        "40,41,42,43",
                        List.of("https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        womenDresses,
                        "Vay midi hoa nhe",
                        "Vay midi chat voan nhe, phu hop di lam va di choi.",
                        520000,
                        389000,
                        80,
                        "Hong",
                        "S,M,L",
                        List.of("https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        womenTops,
                        "Ao kieu nu linen tay phong",
                        "Ao kieu linen nhe mat, tay phong nhe, phoi tot voi quan jean hoac chan vay.",
                        450000,
                        329000,
                        85,
                        "Kem",
                        "S,M,L",
                        List.of("https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        womenBags,
                        "Tui xach nu cong so da PU",
                        "Tui xach nu da PU mem, nhieu ngan, phu hop di lam.",
                        690000,
                        469000,
                        65,
                        "Nau",
                        "FREE",
                        List.of("https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        womenHeels,
                        "Giay cao got block heel 5cm",
                        "Giay cao got block heel vung chan, thiet ke thanh lich cho cong so.",
                        850000,
                        599000,
                        40,
                        "Den",
                        "36,37,38,39",
                        List.of("https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&w=500")
                ),
                product(
                        seller,
                        appleMobile,
                        "iPhone 15 128GB chinh hang",
                        "iPhone 15 128GB, man hinh Super Retina XDR, camera 48MP.",
                        22990000,
                        19990000,
                        25,
                        "Den",
                        "128GB",
                        List.of("https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        samsungMobile,
                        "Samsung Galaxy S24 256GB",
                        "Samsung Galaxy S24 256GB, man hinh AMOLED, hieu nang cao.",
                        23990000,
                        18990000,
                        30,
                        "Xam",
                        "256GB",
                        List.of("https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        gamingLaptops,
                        "Laptop gaming RTX 4060 16GB RAM",
                        "Laptop gaming 15.6 inch 144Hz, RTX 4060, RAM 16GB, SSD 512GB.",
                        29990000,
                        24990000,
                        18,
                        "Den",
                        "15.6 inch",
                        List.of("https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&w=500")
                ),
                product(
                        seller,
                        headphones,
                        "Tai nghe bluetooth ANC Pro",
                        "Tai nghe bluetooth chong on chu dong, pin 30 gio.",
                        1890000,
                        1290000,
                        45,
                        "Den",
                        "FREE",
                        List.of("https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        powerBanks,
                        "Sac du phong 20000mAh PD 22.5W",
                        "Sac du phong dung luong 20000mAh, sac nhanh PD, 2 cong USB-A va 1 cong USB-C.",
                        790000,
                        590000,
                        140,
                        "Trang",
                        "20000mAh",
                        List.of("https://images.pexels.com/photos/4526477/pexels-photo-4526477.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        smartWatches,
                        "Dong ho thong minh AMOLED GPS",
                        "Smartwatch man hinh AMOLED, GPS, SpO2, chong nuoc IP68.",
                        3490000,
                        2490000,
                        55,
                        "Den",
                        "FREE",
                        List.of("https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        beddingSets,
                        "Bo chan ga cotton lanh 4 mon",
                        "Bo chan ga goi cotton lanh mem min, thoang mat, gom 4 mon.",
                        1050000,
                        750000,
                        60,
                        "Xanh la",
                        "Queen,King",
                        List.of("https://images.pexels.com/photos/1267300/pexels-photo-1267300.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        tableLamps,
                        "Den ban LED cam ung",
                        "Den ban LED co 3 che do sang va cong sac USB-C.",
                        550000,
                        399000,
                        60,
                        "Vang",
                        "FREE",
                        List.of("https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=500")
                ),
                product(
                        seller,
                        clocks,
                        "Dong ho treo tuong toi gian",
                        "Dong ho treo tuong phong cach toi gian, phu hop phong khach va phong lam viec.",
                        490000,
                        329000,
                        80,
                        "Nau",
                        "FREE",
                        List.of("https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&w=500")
                )
        ));
    }

    private Category category(String categoryId, String name, int level, Category parent) {
        Category existingCategory = categoryRepository.findByCategoryId(categoryId);
        if (existingCategory != null) {
            return existingCategory;
        }

        Category category = new Category();
        category.setCategoryId(categoryId);
        category.setName(name);
        category.setLevel(level);
        category.setParentCategory(parent);

        return categoryRepository.save(category);
    }

    private Product product(
            Seller seller,
            Category category,
            String title,
            String description,
            int mrpPrice,
            int sellingPrice,
            int quantity,
            String color,
            String sizes,
            List<String> images
    ) {
        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category);
        product.setTitle(title);
        product.setDescription(description);
        product.setMrpPrice(mrpPrice);
        product.setSellingPrice(sellingPrice);
        product.setDiscountPercent(calculateDiscountPercent(mrpPrice, sellingPrice));
        product.setQuantity(quantity);
        product.setColor(color);
        product.setSizes(sizes);
        product.setImages(images);
        product.setCreatedAt(LocalDateTime.now());

        return product;
    }

    private int calculateDiscountPercent(int mrpPrice, int sellingPrice) {
        if (mrpPrice <= 0) {
            return 0;
        }

        return (int) (((double) (mrpPrice - sellingPrice) / mrpPrice) * 100);
    }
}
