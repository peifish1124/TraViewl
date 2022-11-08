import { Toolbar } from "@mui/material";
import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import {
  SentimentRatioCard,
  KeywordsCard,
  TitleCard,
  AspectCard,
} from "./Components";
import sentimentRatios from "../../assets/temp/sentimentRatio";
import hotels from "../../assets/temp/hotel";
import { Hotel } from "../../models/Hotel";
import styled from "styled-components";
import keywords from "../../assets/temp/keyword";
import aspects from "../../assets/temp/aspects";

export default function HotelDetail(props: any, state: any) {
  const location = useLocation();
  const [hotelId, setHotelId] = useState("");
  const [hotelInfo, setHotelInfo] = useState<Hotel>();

  useEffect(() => {
    setHotelId(location.state);
    setHotelInfo(hotels[0]);
  }, []);

  return (
    <>
      <Toolbar></Toolbar>
      <Background>
        {/* <TitleBar title="HotelDetail"></TitleBar>  */}
        <img
          src={require("../../assets/temp/hotelProfileDetail.png")}
          width="100%"
          height="400px"
        ></img>
        <TitleCard>{hotelInfo?.Name}</TitleCard>

        {/* </div> */}
        <CenterDiv>
          <Wrap>
            <SentimentRatioCard data={sentimentRatios} />
            <KeywordsCard data={keywords} />
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <AspectCard items={aspects} />
          </Wrap>

          <br />
        </CenterDiv>
      </Background>
    </>
  );
}
