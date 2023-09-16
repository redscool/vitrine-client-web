import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Route, Routes, useParams } from "react-router-dom";

export default function Dashboard() {
  const params = useParams();
  let curTab = params["*"].toLowerCase();
  if (curTab === "") curTab = "home";
  console.log(curTab);
  return (
    <React.Fragment>
      <NavigationBar selected={curTab} />
      <Box
        sx={{
          // background: "#16181f",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ marginLeft: "5vw" }}>
          <Routes>
            <Route exact path="/home" element={null} />
            <Route exact path="/" element={null} />
            <Route exact path="/spaces" element={null} />
            <Route exact path="/calendar/:year/:month" element={null} />
            <Route exact path="/calendar" element={null} />
            <Route exact path="/profile" element={null} />
            <Route path="/*" element={<span> Not found </span>} />
          </Routes>
        </Box>
      </Box>
    </React.Fragment>
  );
}
