import React from "react";

import SellerLayout from "../seller/components/SellerLayout";

import Dashboard from "../seller/pages/dashboard/Dashboard";
import ProductList from "../seller/pages/products/ProductList";
import OrderList from "../seller/pages/orders/OrderList";
import CustomerList from "../seller/pages/customers/CustomerList";
import SellerProfile from "../seller/pages/profile/SellerProfile";
import Reports from "../seller/pages/reports/Reports";
import Discounts from "../seller/pages/discounts/Discounts";
import Help from "../seller/pages/help/Help";
import Settings from "../seller/pages/settings/Settings";

import SellerLoginPage from "../seller/pages/auth/SellerLoginPage";
import SellerRegisterPage from "../seller/pages/auth/SellerRegisterPage";
import VerifySellerPage from "../seller/pages/auth/VerifySellerPage";

export const sellerRoutes = [
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "add-product",
        element: <ProductList />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "customers",
        element: <CustomerList />,
      },
      {
        path: "profile",
        element: <SellerProfile />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "discounts",
        element: <Discounts />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
];
