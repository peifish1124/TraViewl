import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import {
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReactWordcloud, { Word } from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Chart from "./Chart";
import Carousel from "react-material-ui-carousel";
import "./css/Carousel.css";

import { SentimentRatio } from "../../../models/SentimentRatio";
import {
  Bar,
  Blank,
  Card,
  Main,
  Reminder,
  SBarDiv,
  SRow,
  SText,
  Title,
} from "./Components";
import { AspectReview, Review } from "../../../models/AspectReview";

interface WrapProps {
  flex?: number;
}

const Wrap = styled.div<WrapProps>`
  display: flex;
  flex-direcrion: row;
  width: 100%;
  margin: 1em 0;
  flex: ${(props) => props.flex};
`;

const SideDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em;
`;

const ChartContainer = styled.div`
  height: 80%;
  align-self: center;
`;

const CloudContainer = styled.div`
  width: 90%;
  height: 100%;
`;

interface SentimentRatioCardProps {
  data: SentimentRatio[] | undefined;
  wordcloud: { [key: string]: Word[] } | undefined;
  summarize: { [key: string]: string } | undefined;
  aspectReview: AspectReview | undefined;
  onClick: Function;
  sentimentIdx: number;
  setSentimentIdx: Dispatch<SetStateAction<number>>;
}

export function SentimentRatioCard(props: SentimentRatioCardProps) {
  const { data, wordcloud, summarize, aspectReview } = props;

  const [aspect, setAspect] = useState<string | number>("房間");

  const sentiment = ["正向", "中性", "負向"];

  const [carouselItems, setCarouselItems] = useState<object[]>();

  useEffect(() => {
    setCarouselItems(getCarousel(aspectReview, aspect, props.sentimentIdx));
  }, [aspectReview, aspect, props.sentimentIdx])

  const handleAspectChange = (
    event: React.MouseEvent<HTMLElement>,
    newAspect: string
  ) => {
    if (newAspect !== null) setAspect(newAspect);
  };

  const getChart = (
    sentiments: SentimentRatio[] | undefined,
    aspect: string | number
  ) => {
    const data = sentiments?.find((s) => s.aspect === aspect);
    if (!data) return [];
    return [
      { title: "正向", value: data.positive, color: "#60C35E" },
      { title: "中性", value: data.neutral, color: "#D9D9D9" },
      { title: "負向", value: data.negative, color: "#FF9432" },
    ];
  };

  const reviewsToCarousel = (reviews: Review[], sentimentIdx: number) => {
    const pos_thresh = 10.0;
    const neg_thresh = 7.6;
    let all = undefined;

    if (sentimentIdx === 0) {
      all = reviews.filter((r) => r.star >= pos_thresh);
    } else if (sentimentIdx === 1) {
      all = reviews.filter((r) => r.star >= neg_thresh && r.star < pos_thresh);
    } else {
      all = reviews.filter((r) => r.star < neg_thresh);
    }

    let len = all.length % 2 === 0 ? all.length - 1 : all.length;
    if (len > 9) len = 9;

    return all.slice(0, len).map(({ title, normal_text, star }) => ({
      name: title,
      description: normal_text,
      star,
    }));
  };

  const getCarousel = (
    aspectReview: AspectReview | undefined,
    aspect: string | number,
    sentimentIdx: number
  ) => {
    if (!aspectReview) return [];
    return reviewsToCarousel(aspectReview[aspect], sentimentIdx);
  };

  const Item = ({ item }: any) => {
    let right = undefined;
    const left = (
      <Paper className="item">
        <Wrap
          style={{
            margin: 0,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b className="title" style={{ margin: 0 }}>
            {item[0].name}
          </b>
          <Chip label={item[0].star} color="info" variant="outlined" />
        </Wrap>
        <p className="content">{item[0].description}</p>
      </Paper>
    );

    if (item[1]) {
      right = (
        <Paper className="item">
          <Wrap
            style={{
              margin: 0,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <b className="title" style={{ margin: 0 }}>
              {item[1].name}
            </b>
            <Chip label={item[1].star} color="info" variant="outlined" />
          </Wrap>
          <p className="content">{item[1].description}</p>
        </Paper>
      );
    } else {
      right = (
        <Paper
          className="item"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => props.onClick(aspect)}
            style={{ alignSelf: "center" }}
          >
            {aspect + "相關評論"}
          </Button>
        </Paper>
      );
    }

    return (
      <Wrap className="items">
        {left}
        {right}
      </Wrap>
    );
  };

  const callbacks = {
    getWordTooltip: (word: any) => `${word.text} (tf-idf=${word.value})`,
  };

  return (
    <Card style={{ flex: 1, height: 1000, maxHeight: 1000 }}>
      <Title style={{ paddingBottom: 0 }}>面向情感</Title>
      <Main disableOverflow={true}>
        <Wrap style={{ height: "300px" }}>
          <SideDiv style={{ flex: 1, padding: "0 40px" }}>
            <ToggleButtonGroup
              color="info"
              value={aspect}
              exclusive
              onChange={handleAspectChange}
              aria-label="Platform"
            >
              {["房間", "早餐", "設備", "交通", "服務", "價格"].map((a, i) => (
                <ToggleButton value={a} key={i}>
                  {a}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <div style={{ margin: "1.5em 1em 0 1em" }}>
              <b>正向評論摘要</b>
              <p>{summarize ? summarize[aspect + "_正"] : null}</p>
              <b>中性評論摘要</b>
              <p>{summarize ? summarize[aspect + "_中"] : null}</p>
              <b>負向評論摘要</b>
              <p>{summarize ? summarize[aspect + "_負"] : null}</p>
            </div>
          </SideDiv>
          <SideDiv style={{ flex: 1, alignItems: "center" }}>
            <ChartContainer>
              <Chart
                data={getChart(data, aspect)}
                sentimentIdx={props.sentimentIdx}
                setSentimentIdx={props.setSentimentIdx}
              />
            </ChartContainer>
            <p style={{ color: "#C0C0C0" }}>點擊查看不同情感</p>
          </SideDiv>
        </Wrap>
        <div style={{ width: "88%" }}>
          <Divider>
            {aspect + " - " + sentiment[props.sentimentIdx] + "相關評論"}
          </Divider>
        </div>
        <Wrap style={{ justifyContent: "center", margin: 0 }}>
          <Carousel
            className="carousel"
            height={200}
            animation="slide"
            autoPlay={false}
            fullHeightHover={false}
            index={0}
            navButtonsAlwaysVisible
            navButtonsProps={{
              style: {
                color: "#464646",
                backgroundColor: "#D9D9D900",
              },
            }}
            indicatorContainerProps={{
              style: {
                marginTop: "15px",
              },
            }}
          >
            {carouselItems
              ? Array.from(
                  Array(Math.ceil(carouselItems.length / 2)).keys()
                ).map((_, i) => (
                  <Item
                    item={carouselItems.slice(i * 2, i * 2 + 2)}
                    key={"view" + i}
                  />
                ))
              : null}
          </Carousel>
        </Wrap>
        <div style={{ width: "88%", marginTop: "1.5em" }}>
          <Divider>
            {aspect + " - " + sentiment[props.sentimentIdx] + "關鍵字"}
          </Divider>
        </div>
        <Wrap flex={1} style={{ justifyContent: "center" }}>
          <CloudContainer>
            <ReactWordcloud
              words={
                wordcloud
                  ? wordcloud[aspect + "＿" + sentiment[props.sentimentIdx][0]]
                  : []
              }
              // words={words}
              callbacks={callbacks}
              options={{
                deterministic: true,
                rotations: 0,
                fontSizes: [16, 48],
              }}
            />
          </CloudContainer>
        </Wrap>
      </Main>
    </Card>
  );
}
