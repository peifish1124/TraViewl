import { Toolbar } from "@mui/material";
import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { TitleCard } from "./components/Components";
import hotels from "../../assets/temp/hotel";
import { Hotel } from "../../models/Hotel";
import { SentimentRatio } from "../../models/SentimentRatio";
import styled from "styled-components";
import keywords from "../../assets/temp/keyword";
import aspects from "../../assets/temp/aspects";
import { amounts } from "../../assets/temp/amount";
import scoreCnts from "../../assets/temp/scoreCnt";
import { SentimentRatioCard } from "./components/SentimentRatioCard";
import { KeywordsCard } from "./components/KeywordsCard";
import { AspectCard } from "./components/AspectCard";
import { AmountCard } from "./components/AmountCard";
import { ScoresCard } from "./components/ScoreCardProps";
import { AspectReviewCard } from "./components/AspectReviewCard";
import TopBar from "../../components/TopBar";

import { getSentimentRatio } from '../../toBackend/api';


const subTitleRe = /(\w+)/;

export default function HotelDetail(props: any, state: any) {
  const location = useLocation();
  const [hotelId, setHotelId] = useState("");
  const [hotelInfo, setHotelInfo] = useState<Hotel>();
  const [hotelTitle, setHotelTitle] = useState<String>();
  const [hotelSubTitle, setHotelSubTitle] = useState<String>();
  const [sentimentRatios, setSentimentRatios] = useState<SentimentRatio[]>();

  useEffect(() => {
    setHotelId(location.state);
    setHotelInfo(hotels[0]);
    // const titleMatchList = hotels[0]?.Name?.match(/[ w]/);
    // if (titleMatchList && titleMatchList.length !== 0) {
    //   setHotelTitle(hotels[0]?.Name?.replace(titleMatchList[0], ""));
    //   setHotelSubTitle(titleMatchList[0]);
    // }
    const indC = hotels[0]?.Name?.indexOf("(");
    setHotelTitle(hotels[0]?.Name?.substring(0, indC));
    setHotelSubTitle(
      hotels[0]?.Name?.substring(indC || hotels[0]?.Name?.length)
    );

    // console.log(hotelId);
    const setSR = async () => {
      await getSentimentRatio("636d32111a537da8fd0a1bb2")
      .then(sr => {
        setSentimentRatios(sr);
      });
    }
    setSR();
    
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <Toolbar></Toolbar>
      <Background>
        <img
          src={require("../../assets/temp/hotelProfileDetail.png")}
          width="100%"
          height="400px"
        ></img>
        <TitleCard>
          <p>{hotelTitle}</p>
          <p style={{ marginTop: 0 }}>{hotelSubTitle}</p>
        </TitleCard>
        <CenterDiv style={{ paddingBottom: 100 }}>
          <Wrap>
            <SentimentRatioCard data={sentimentRatios} />
            <KeywordsCard data={keywords} />
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <AspectCard items={aspects} />
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <AmountCard data={amounts} />
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <ScoresCard data={scoreCnts} />
            <AspectReviewCard />
          </Wrap>
        </CenterDiv>
      </Background>
    </>
  );
}
