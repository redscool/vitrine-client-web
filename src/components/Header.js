import React, { useState } from "react";
import {
  AppBar,
  Switch,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComponent from "./DrawerComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setTheme, themeSelector } from "../redux/settingReducer";
import { useNavigate } from "react-router-dom";
export default function Header({ isLogin }) {
  const THEME = useSelector(themeSelector);
  const [value, setValue] = useState(isLogin ? 1 : 0);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "secondary.main" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography
                sx={{
                  fontSize: "2rem",
                  paddingLeft: "10%",
                  color: "text.primary",
                }}
              >
                BeeTwo
              </Typography>
              <DrawerComponent />
            </>
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  paddingLeft: "10%",
                  color: "text.primary",
                }}
              >
                BeeTwo
              </Typography>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  sx={{ color: "text.primary" }}
                  label="Signup"
                  onClick={() => navigate("/signup")}
                />
                <Tab
                  sx={{ color: "text.primary" }}
                  label="Login"
                  onClick={() => navigate("/login")}
                />
              </Tabs>
              <Switch
                checked={THEME === "dark"}
                sx={{ marginLeft: "auto", color: "text.primary" }}
                onChange={() => {
                  dispatch(setTheme(THEME === "light" ? "dark" : "light"));
                }}
                label="Dark Mode"
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
