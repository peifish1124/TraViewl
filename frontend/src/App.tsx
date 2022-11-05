import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Home from "./pages/Home";
import { Box, Container } from "@mui/material";

function App(props: any) {
  return (
    <React.Fragment>
      <TopBar></TopBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      {/* <Container>
        <Box sx={{ my: 2 }}>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1> <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
          <h1>ho</h1>
        </Box>
      </Container> */}
    </React.Fragment>
    // <React.Fragment>
    //   <CssBaseline />
    //   <TopBar {...props} />
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //     </Routes>
    //   </BrowserRouter>
    // </React.Fragment>
  );
}

export default App;
