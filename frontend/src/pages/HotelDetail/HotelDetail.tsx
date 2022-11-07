import { Toolbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Background, CenterDiv } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { SentimentRatioCard } from "./Components";

export default function HotelDetail() {
  useEffect(() => {}, []);
  return (
    <>
      <Toolbar></Toolbar>
      <Background>
        <TitleBar title="HotelDetail"></TitleBar>
        <CenterDiv>
          {/* <h1>HotelDetail</h1> */}
          <SentimentRatioCard />
        </CenterDiv>
      </Background>
    </>
  );
}
