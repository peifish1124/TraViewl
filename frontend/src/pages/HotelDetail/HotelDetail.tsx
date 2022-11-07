import { Toolbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { SentimentRatioCard, KeywordsCard } from "./Components";
import sentimentRatios from "../../assets/temp/sentimentRatio";

export default function HotelDetail() {
  useEffect(() => {}, []);
  return (
    <>
      <Toolbar></Toolbar>
      <Background>
        <TitleBar title="HotelDetail"></TitleBar>
        <CenterDiv>
          <h1>HotelDetail</h1>
          <Wrap>
            <SentimentRatioCard data={sentimentRatios} />
            <KeywordsCard />
          </Wrap>
          <br />
        </CenterDiv>
      </Background>
    </>
  );
}
