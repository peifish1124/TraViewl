import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Paper, Theme, Typography } from "@mui/material";
import { Title } from "@mui/icons-material";

interface TitleBarProps {
  title: string;
}

export default function TitleBar(props: TitleBarProps) {
  return (
    <AppBar
      component="nav"
      position="relative"
      style={{
        height: 74,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#427FA0",
      }}
    >
      <Toolbar style={{ marginTop: 5, justifyContent: "center" }}>
        <Typography
          variant="h6"
          component="div"
          style={{ marginTop: 5, fontSize: 30 }}
          sx={{
            // marginTop: 5,
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
            // background: "red",
          }}
        >
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
