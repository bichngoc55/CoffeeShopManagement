import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import LoginPage from "./pages/LoginPage/Login";
import History from "./pages/HistoryPage/history";
import Booking from "./pages/BookingPage/booking";
import Staff from "./pages/StaffPage/staff";
import Home from "./pages/HomePage/home";
import MenuPage from "./pages/MenuPage/MenuPage";
import Inventory from "./pages/InventoryPage/inventory";
import Analytics from "./pages/AnalyticsPage/analytics";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const token = useSelector((state) => state.auths.token);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/inventory"
              element={token ? <Inventory /> : <Navigate to="/login" />}
            />
            <Route path="/staff" element={<Staff />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route
              path="/booking"
              element={token ? <Booking /> : <Navigate to="/login" />}
            />
            <Route
              path="/history"
              element={token ? <History /> : <Navigate to="/login" />}
            />
            {/* <Route
              path="/"
              element={isAuth ? <Inventory /> : <Navigate to="/login" />}
            /> */}
            <Route
              path="/analytics"
              element={token ? <Analytics /> : <Navigate to="/login" />}
            />
            <Route
              path="/menu"
              element={token ? <MenuPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
