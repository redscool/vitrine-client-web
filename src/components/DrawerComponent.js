import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { setTheme, themeSelector } from "../redux/settingReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const pages = ["Sign up", "Log in"];
const DrawerComponent = () => {
  const navigate = useNavigate();
  const THEME = useSelector(themeSelector);
  const [openDrawer, setOpenDrawer] = useState(false);
  const pageRoutes = ["/signup", "/login"];
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText onClick={() => navigate(pageRoutes[index])}>
                  {page}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <ListItemButton>
            <ListItemIcon>
              <Switch
                checked={THEME === "dark"}
                sx={{ margin: "auto", color: "text.primary" }}
                onChange={() => {
                  dispatch(setTheme(THEME === "light" ? "dark" : "light"));
                }}
                label="Dark Mode"
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "primary", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComponent;
