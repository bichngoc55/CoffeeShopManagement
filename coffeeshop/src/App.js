import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import LoginPage from "./pages/Login/Login";
import DashBoard from "./components/dashBoard/dashBoard";
import { useState } from "react";
import Home from "./pages/HomePage/home";
import Menu from "./pages/MenuPage/menu";
import Inventory from "./pages/InventoryPage/inventory";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //const isAuth = Boolean(useSelector((state) => state.token));
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="sidebar">
            <DashBoard isSidebar={isSidebar} />
          </div>
          {/* <NavBar setIsSidebar={setIsSidebar} /> */}
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/menu" element={<Menu />} />
              {/* <Route
              path="/order"
              element={isAuth ? <OrderPage /> : <Navigate to="/" />}
            />  */}
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
