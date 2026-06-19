import React from "react";
import LoginPage from "../customer/pages/auth/LoginPage";
import RegisterPage from "../customer/pages/auth/RegisterPage";
import Navbar from "../customer/components/navbar/Navbar";
import Home from "../customer/pages/home/Home";
import Footer from "../customer/components/footer/Footer";
import ProductDetail from "../customer/pages/product/product_detail/ProductDetail";
import Product from "../customer/pages/product/Product";
import Account from "../customer/pages/account/Account";
import Cart from "../customer/pages/cart/Cart";
import Checkout from "../customer/pages/checkout/Checkout";
import Payment from "../customer/pages/checkout/Payment";
import Review from "../customer/pages/review/Review";
import SellerLoginPage from "../seller/pages/auth/SellerLoginPage";
import SellerRegisterPage from "../seller/pages/auth/SellerRegisterPage";
import VerifySellerPage from "../seller/pages/auth/VerifySellerPage";
import Wishlist from "../customer/pages/wishlist/Wishlist";

const CustomerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export const customerRoutes = [
  {
    path: "/",
    element: (
      <CustomerLayout>
        <Home />
      </CustomerLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <CustomerLayout>
        <LoginPage />
      </CustomerLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <CustomerLayout>
        <RegisterPage />
      </CustomerLayout>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <CustomerLayout>
        <ProductDetail />
      </CustomerLayout>
    ),
  },
  {
    path: "/product-list",
    element: (
      <CustomerLayout>
        <Product />
      </CustomerLayout>
    ),
  },
  {
    path: "/payment",
    element: (
      <CustomerLayout>
        <Payment />
      </CustomerLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <CustomerLayout>
        <Cart />
      </CustomerLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <CustomerLayout>
        <Checkout />
      </CustomerLayout>
    ),
  },
  {
    path: "/account/*",
    element: (
      <CustomerLayout>
        <Account />
      </CustomerLayout>
    ),
  },
  {
    path: "/product/:id/reviews",
    element: (
      <CustomerLayout>
        <Review />
      </CustomerLayout>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <CustomerLayout>
        <Wishlist />
      </CustomerLayout>
    ),
  },
  {
    path: "/seller/login",
    element: (<CustomerLayout><SellerLoginPage /></CustomerLayout>),
  },
  {
    path: "/seller/register",
    element: (<CustomerLayout><SellerRegisterPage /></CustomerLayout>),
  },
  {
    path: "/verify-seller/:otp",
    element: (<CustomerLayout><VerifySellerPage /></CustomerLayout>),
  },
];
