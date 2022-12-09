import { Backdrop, Toolbar } from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Word } from "react-wordcloud";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { Card, Title, TitleCard } from "./components/Components";
import { Hotel } from "../../models/Hotel";
import { SentimentRatio } from "../../models/SentimentRatio";
import styled from "styled-components";
// import aspects from "../../assets/temp/aspects";
import { SentimentRatioCard } from "./components/SentimentRatioCard";
import { KeywordsCard } from "./components/KeywordsCard";
import { AspectCard } from "./components/AspectCard";
import { AmountCard } from "./components/AmountCard";
import { ScoresCard } from "./components/ScoresCard";
import { AspectReviewCard } from "./components/AspectReviewCard";
import TopBar from "../../components/TopBar";
import {
  getHotel,
  // getSentimentRatio,
  // getKeyword,
  getHotelContent,
  getHotelAspect,
  getAmount,
  //   getFixedAspect,
  getScoreCnts,
} from "../../toBackend/api";
import { Aspect } from "../../models/Aspect";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Reviews } from "./components/Reviews";
import { AspectReview, Review } from "../../models/AspectReview";
import { AmountData } from "../../models/AmountData";

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
  const [searchParams] = useSearchParams();

  const [hotelId, setHotelId] = useState("");
  const [hotelInfo, setHotelInfo] = useState<Hotel>();
  const [hotelTitle, setHotelTitle] = useState<String>();
  const [hotelSubTitle, setHotelSubTitle] = useState<String>();
  const [sentimentRatios, setSentimentRatios] = useState<SentimentRatio[]>([]);
  const [keywords, setKeywords] = useState<{ [key: string]: number }>();
  const [wordcloud, setWordcloud] = useState<{ [key: string]: Word[] }>();
  const [summarize, setSummarize] = useState<{ [key: string]: string }>();
  const [aspects, setAspects] = useState<Aspect>();
  const [coverShow, setCoverShow] = useState<boolean>(false);
  const [aspectReview, setAspectReview] = useState<AspectReview>();
  const [reviews, setReviews] = useState<Review[]>();
  const [amounts, setAmounts] = useState<AmountData[]>();
  //   const [fixedAspects, setFixedAspects] = useState<string[]>([]);
  //   const [coverShow, setCoverShow] = useState<boolean>(true);
  const [scoreCnts, setScoreCnts] = useState<object>();
  const [sentimentIdx, setSentimentIdx] = useState<number>(1);

  useEffect(() => {
    setHotelId(searchParams.get("_id") || "");

    const indC = searchParams.get("Name")?.indexOf("(");
    setHotelTitle(searchParams.get("Name")?.substring(0, indC));
    setHotelSubTitle(
      searchParams
        .get("Name")
        ?.substring(indC || searchParams.get("Name")?.length || 0)
    );

    getHotel(searchParams.get("_id") || "").then(
      ({ sentiment_ratio, keyword, word_cloud, summarize }) => {
        setSentimentRatios(sentiment_ratio);
        setKeywords(keyword);
        setWordcloud(word_cloud);
        setSummarize(summarize);
      }
    );

    getHotelContent(searchParams.get("_id") || "").then((ct) => {
      setAspects(ct);
    });

    getHotelAspect(searchParams.get("_id") || "").then((ar) => {
      setAspectReview(ar);
      // =======
      //     getFixedAspect("636d32111a537da8fd0a1bb2").then((fa) => {
      //       setFixedAspects(fa);
      // >>>>>>> d08d65d40c9f8a24dd27f123945e5a70df785487
    });
    getScoreCnts(searchParams.get("_id") || "").then((sc) => {
      setScoreCnts(sc);
    });

    getAmount(searchParams.get("_id") || "").then((am) => {
      setAmounts(am);
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
    if (aspectReview && reviews === aspectReview[aspect]) {
      setCoverShow(true);
    } else if (aspectReview) {
      setReviews(
        aspectReview[aspect].filter((x) => {
          if (sentimentIdx === 0) return x.star >= 10.0;
          if (sentimentIdx === 1) return x.star >= 7.6 && x.star < 10.0;
          if (sentimentIdx === 2) return x.star < 7.6;
          return false;
        })
      );
    }
  };

  return (
    <>
      <TopBar></TopBar>
      <Toolbar></Toolbar>
      <Background>
        <img
          // src={require("../../assets/temp/hotelProfileDetail.png")}
          src={searchParams.get("Subpage_Image") || ""}
          width="100%"
          height="400px"
        ></img>
        <TitleCard>
          <p>{hotelTitle}</p>
          <p style={{ marginTop: 0 }}>{hotelSubTitle}</p>
        </TitleCard>
        <CenterDiv style={{ paddingBottom: 100 }}>
          <Wrap>
            <SentimentRatioCard
              data={sentimentRatios}
              wordcloud={wordcloud}
              summarize={summarize}
              aspectReview={aspectReview}
              onClick={showReviews}
              setSentimentIdx={setSentimentIdx}
              sentimentIdx={sentimentIdx}
            />
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            {aspects ? <AspectCard items={aspects} /> : null}
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            {amounts ? <AmountCard data={amounts} /> : null}
          </Wrap>
          <Wrap style={{ marginTop: 20 }}>
            <ScoresCard data={scoreCnts} />
            <KeywordsCard data={keywords} />
            {/* <AspectReviewCard onClick={showReviews} aspect={aspectReview} /> */}
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
