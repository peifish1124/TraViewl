import { Toolbar } from "@mui/material";
import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Background, CenterDiv } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { SentimentRatioCard } from "./Components";
import hotels from "../../assets/temp/hotel";
import { Hotel } from "../../models/Hotel";

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
        <div
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
          }}
        >
          {hotelInfo?.Name}
        </div>
        <CenterDiv>
          {/* <h1>HotelDetail</h1> */}
          {/* <SentimentRatioCard /> */}
        </CenterDiv>
      </Background>
    </>
  );
}
