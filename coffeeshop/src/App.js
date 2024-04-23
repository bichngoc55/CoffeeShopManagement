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
import { useState } from "react";
import Home from "./pages/home/HomePage";
//import Menu from "./pages/MenuPage/menu";
import Inventory from "./pages/InventoryPage/inventory";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/stuff" element={<Stuff />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/booking" element={<Booking />} />
            {/* <Route
              path="/order"
              element={isAuth ? <OrderPage /> : <Navigate to="/" />}
            />  */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
