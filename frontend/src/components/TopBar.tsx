import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Image } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function TopBar() {
  return (
    <ElevationScroll>
      <AppBar
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
    </ElevationScroll>
  );
}
