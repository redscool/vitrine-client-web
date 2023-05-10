import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ClassSpace from "./pages/ClassSpace";
import Signup from "./pages/Signup";
import './App.css'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/classspace/*" element={<ClassSpace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
