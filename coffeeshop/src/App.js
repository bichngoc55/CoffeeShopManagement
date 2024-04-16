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
import NavBar from "./components/navBar/navBar";
// import HomePage from "./pages/HomePage";
// import OrderPage from "./pages/OrderPage";

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

          <DashBoard isSidebar={isSidebar} />
          {/* <NavBar setIsSidebar={setIsSidebar} /> */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/home" element={<DashBoard />} /> */}

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
