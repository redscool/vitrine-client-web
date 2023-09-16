import { useTheme } from "@emotion/react";
import { Box, Switch } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setTheme, themeSelector } from "../redux/settingReducer";
import { useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import Branding from "./Branding";
import Tab from "./navigationBar/Tab";

export default function NavigationBar({ selected }) {
  const [hoverOn, setHoverOn] = useState("");
  const [expand, setExpand] = useState(false);
  const theme = useTheme();
  const navbarColor = theme.palette.primary.navbar;
  const THEME = useSelector(themeSelector);

  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        // backdropFilter: expand ? "blur(10px)" : "",
        // background: navbarColor,
        background: "rgb(18,18,18)",
        background: expand
          ? "linear-gradient(90deg, rgba(18,18,18,1) 35%, rgba(18,18,18,0) 100%)"
          : "rgb(18,18,18)",
        height: "100vh",
        width: expand ? "200px" : "100px",
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "width 0.25s ease-out",
      }}
    >
      <Branding />
      <Box sx={{ margin: "5vh auto 0 20px", width: 1 / 2 }}>
        <Switch
          inputProps={{ "aria-label": "controlled" }}
          checked={THEME === "dark"}
          onChange={() => {
            dispatch(setTheme(THEME === "light" ? "dark" : "light"));
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "10vh",
          cursor: "pointer",
          boxShadow: "5px 10px primary.navbar",
        }}
        onMouseEnter={() => setExpand(true)}
        onMouseLeave={() => setExpand(false)}
      >
        {/* home */}
        <Tab
          filledIcon={
            <HomeIcon
              sx={{
                color: "text.primary",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          outlinedIcon={
            <HomeOutlinedIcon
              sx={{
                color: "text.navbarIconWithoutHover",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          name="home"
          title="Home"
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          route="/dashboard"
          selected={selected}
          expand={expand}
        />
        {/* space */}
        <Tab
          filledIcon={
            <WorkspacesIcon
              sx={{
                color: "text.primary",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          outlinedIcon={
            <WorkspacesOutlinedIcon
              sx={{
                color: "text.navbarIconWithoutHover",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          name="spaces"
          title="Spaces"
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          route="/dashboard/spaces"
          selected={selected}
          expand={expand}
        />
        {/* Calendar */}
        <Tab
          filledIcon={
            <CalendarTodayIcon
              sx={{
                color: "text.primary",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          outlinedIcon={
            <CalendarTodayOutlinedIcon
              sx={{
                color: "text.navbarIconWithoutHover",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          name="calendar"
          title="Calendar"
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          route="/dashboard/calendar"
          selected={selected}
          expand={expand}
        />
        {/* Profile */}
        <Tab
          filledIcon={
            <AccountCircleIcon
              sx={{
                color: "text.primary",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          outlinedIcon={
            <AccountCircleOutlinedIcon
              sx={{
                color: "text.navbarIconWithoutHover",
                margin: "1vh 20px 0 40px",
              }}
            />
          }
          name="profile"
          title="Profile"
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          route="/dashboard/profile"
          selected={selected}
          expand={expand}
        />
      </Box>
    </Box>
  );
}
