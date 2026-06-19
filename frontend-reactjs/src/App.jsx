import React from "react";
import { ThemeProvider } from "@mui/material";

import CustomeTheme from "./theme/CustomeThem";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={CustomeTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
