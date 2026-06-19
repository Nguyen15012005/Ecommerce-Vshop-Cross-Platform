import React from "react";
import { useRoutes } from "react-router-dom";

import { customerRoutes } from "./CustomerRoutes";
import { sellerRoutes } from "./SellerRoutes";

const AppRoutes = () => {
  const routing = useRoutes([...customerRoutes, ...sellerRoutes]);

  return routing;
};

export default AppRoutes;
