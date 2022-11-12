import { Backdrop, Toolbar } from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { Card, Title, TitleCard } from "./components/Components";
import hotels from "../../assets/temp/hotel";
import { Hotel } from "../../models/Hotel";
import { SentimentRatio } from "../../models/SentimentRatio";
import styled from "styled-components";
// import aspects from "../../assets/temp/aspects";
import { amounts } from "../../assets/temp/amount";
import scoreCnts from "../../assets/temp/scoreCnt";
import { SentimentRatioCard } from "./components/SentimentRatioCard";
import { KeywordsCard } from "./components/KeywordsCard";
import { AspectCard } from "./components/AspectCard";
import { AmountCard } from "./components/AmountCard";
import { ScoresCard } from "./components/ScoreCardProps";
import { AspectReviewCard } from "./components/AspectReviewCard";
import TopBar from "../../components/TopBar";
import {
  getSentimentRatio,
  getKeyword,
  getHotelContent,
  getHotelAspect,
  // =======
  //   getFixedAspect,
  // >>>>>>> d08d65d40c9f8a24dd27f123945e5a70df785487
} from "../../toBackend/api";
import { Aspect } from "../../models/Aspect";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Reviews } from "./components/Reviews";
import { AspectReview, Review } from "../../models/AspectReview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

// const OVERLAY_STYLE =

export default function HotelDetail(props: any, state: any) {
  const classes = useStyles();
  const location = useLocation();
  const [hotelId, setHotelId] = useState("");
  const [hotelInfo, setHotelInfo] = useState<Hotel>();
  const [hotelTitle, setHotelTitle] = useState<String>();
  const [hotelSubTitle, setHotelSubTitle] = useState<String>();
  const [sentimentRatios, setSentimentRatios] = useState<SentimentRatio[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [aspects, setAspects] = useState<Aspect>();
  const [coverShow, setCoverShow] = useState<boolean>(false);
  const [aspectReview, setAspectReview] = useState<AspectReview>();
  const [reviews, setReviews] = useState<Review[]>();
  // =======
  //   const [fixedAspects, setFixedAspects] = useState<string[]>([]);
  //   const [coverShow, setCoverShow] = useState<boolean>(true);

  // >>>>>>> d08d65d40c9f8a24dd27f123945e5a70df785487
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

    // console.log("hotelId:", hotelId);

    getSentimentRatio("636d32111a537da8fd0a1bb2").then((sr) => {
      setSentimentRatios(sr);
    }); // hotelId
    getKeyword("636d32111a537da8fd0a1bb2").then((kw) => {
      setKeywords(kw);
    }); // hotelId
    getHotelContent("636d32111a537da8fd0a1bb2").then((ct) => {
      setAspects(ct);
    });

    getHotelAspect("636d32111a537da8fd0a1bb2").then((ar) => {
      setAspectReview(ar);
      // =======
      //     getFixedAspect("636d32111a537da8fd0a1bb2").then((fa) => {
      //       setFixedAspects(fa);
      // >>>>>>> d08d65d40c9f8a24dd27f123945e5a70df785487
    });
  }, []);

  useEffect(() => {
    if (coverShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [coverShow]);

  useEffect(() => {
    if (reviews) {
      setCoverShow(true);
    }
  }, [reviews]);

  const showReviews = (aspect: string) => {
    if (aspectReview) {
      setReviews(aspectReview[aspect]);
      console.log("here", aspectReview[aspect]);
    }
  };

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
            {aspects ? <AspectCard items={aspects} /> : null}
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <AmountCard data={amounts} />
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <ScoresCard data={scoreCnts} />
            <AspectReviewCard onClick={showReviews} aspect={aspectReview} />
            {/* =======
            <AspectReviewCard onClick={() => setCoverShow(true)} data={fixedAspects} />
>>>>>>> d08d65d40c9f8a24dd27f123945e5a70df785487 */}
          </Wrap>
        </CenterDiv>
      </Background>

      <Reviews
        data={reviews}
        classes={classes}
        coverShow={coverShow}
        setCoverShow={setCoverShow}
      />
    </>
  );
}
