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
    path: "/product-details/:categoryId/:name/:productId",
    element: (
      <CustomerLayout>
        <ProductDetail />
      </CustomerLayout>
    ),
  },
  {
    path: "/products/:category",
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
    path: "/reviews/:productId",
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
];
