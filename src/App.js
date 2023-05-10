import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ClassSpace from "./pages/ClassSpace";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/settingReducer";
import { useLayoutEffect } from "react";
import "./App.css";

export default function App() {
  const THEME = useSelector(themeSelector);

  useLayoutEffect(() => {
    document.body.className = THEME;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/classspace/*" element={<ClassSpace />} />
      </Routes>
    </BrowserRouter>
  );
}
