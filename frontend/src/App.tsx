import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Home from "./pages/Home/Home";
import { Box, Container } from "@mui/material";
import HotelDetail from "./pages/HotelDetail/HotelDetail";

function App(props: any) {
  return (
    <React.Fragment>
      <TopBar></TopBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotelDetail" element={<HotelDetail />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
