import { Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Tab({
  route,
  setHoverOn,
  hoverOn,
  outlinedIcon,
  filledIcon,
  title,
  selected,
  name,
  expand,
}) {
  const navigate = useNavigate();
  return (
    <Grid
      container
      onClick={() => navigate(`${route}`)}
      onMouseEnter={() => setHoverOn(name)}
      onMouseLeave={() => setHoverOn("")}
      sx={{
        transition: "transform 0.2s linear",
        marginTop: "4vh",
        height: "5vh",
        ":hover": {
          transform: "translate(5px)",
        },
      }}
    >
      {hoverOn === name || selected === name ? filledIcon : outlinedIcon}
      <Typography
        fontWeight={700}
        sx={{
          color:
            hoverOn === name || selected === name
              ? "text.primary"
              : "text.navbarIconWithoutHover",
          margin: "1vh auto 0 0",
          display: expand ? "inherit" : "none",
          animation: "fade-in 0.2s forwards",
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
}
