import { Toolbar } from "@mui/material";
import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { SentimentRatioCard, KeywordsCard } from "./Components";
import sentimentRatios from "../../assets/temp/sentimentRatio";
import hotels from "../../assets/temp/hotel";
import { Hotel } from "../../models/Hotel";
import styled from "styled-components";
import keywords from "../../assets/temp/keyword";


const TitleCard = styled.div`
  background-color: #ffffff;
  margin-top: -60px;
  font-size: 30px;
  padding: 60px;
  text-align: center;
  text-justify: auto;
  word-wrap: break-word;
  text-overflow: ellipsis;
  color: #464646;
  margin-bottom: 90px;
`;

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
        {/* <div
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: -30,
            fontSize: 40,
            padding: 20,
            textAlign: "center",
            textJustify: "auto",
            wordWrap: "break-word",
            textOverflow: "ellipsis",
            color: "#464646",
            marginBottom: 30,
          }}
        > */}
        <TitleCard>{hotelInfo?.Name}</TitleCard>

        {/* </div> */}
        <CenterDiv>
          <Wrap>
            <SentimentRatioCard data={sentimentRatios} />
            <KeywordsCard data={keywords} />
          </Wrap>
          <br />
        </CenterDiv>
      </Background>
    </>
  );
}
