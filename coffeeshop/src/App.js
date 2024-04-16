import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import LoginPage from "./pages/Login/Login";
import DashBoard from "./components/dashBoard/dashBoard";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import NavBar from "./components/navBar/navBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Switch } from "@mui/material";

// import HomePage from "./pages/HomePage";
// import OrderPage from "./pages/OrderPage";

function App() {
  // const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //const isAuth = Boolean(useSelector((state) => state.token));
  const [isSidebar, setIsSidebar] = useState(true);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);
  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });
  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <div className="switch-container">
            <Switch
              checked={mode}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <DashBoard />
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
