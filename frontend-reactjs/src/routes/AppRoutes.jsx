import React from "react";
import { useRoutes } from "react-router-dom";

import { customerRoutes } from "./CustomerRoutes";

const AppRoutes = () => {
  const routing = useRoutes([...customerRoutes]);

  return routing;
};

export default AppRoutes;
