import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function TitleBar() {
  useEffect(() => {
    console.log("titleBar");
  });
  return (
    <HideOnScroll>
      <AppBar
        position="static"
        style={{
          height: 74,
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Toolbar>
          <Button>
            <img
              src={require("../assets/logo.png")}
              style={{ width: 156, height: 44.4 }}
            ></img>
          </Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
