import { BakeryDining, Title } from "@mui/icons-material";
import { Container, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Background, CenterDiv } from "../components/Pages";
import TitleBar from "../components/TitleBar";
import Box from "@mui/material/Box";
export default function Home() {
  useEffect(() => {
    // console.log("Home");
  });
  return (
    <>
      <Toolbar></Toolbar>
      <Container>
        <Box sx={{ my: 2 }}>
          <h1>h2</h1>
        </Box>
      </Container>
    </>
  );
}
