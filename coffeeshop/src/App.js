import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import LoginPage from "./pages/LoginPage/Login";

import Booking from "./pages/BookingPage/booking";
import Stuff from "./pages/StuffPage/stuff";
import Home from "./pages/HomePage/home";
//import Menu from "./pages/MenuPage/menu";
import Inventory from "./pages/InventoryPage/inventory";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state) => state.auths.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/inventory"
              element={isAuth ? <Inventory /> : <Navigate to="/login" />}
            />
            <Route path="/stuff" element={<Stuff />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route
              path="/booking"
              element={isAuth ? <Booking /> : <Navigate to="/login" />}
            />

            <Route
              path="/"
              element={isAuth ? <Inventory /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
