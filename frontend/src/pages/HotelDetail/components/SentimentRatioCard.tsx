import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { ToggleButton, ToggleButtonGroup, Chip, Paper, Button, Divider } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactWordcloud, { Word } from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import Chart from './Chart';
import Carousel from 'react-material-ui-carousel'
import './css/Carousel.css';

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
import { AspectReview } from '../../../models/AspectReview'


interface WrapProps {
  flex?: number;
}

const Wrap = styled.div<WrapProps>`
  display: flex;
  flex-direcrion: row;
  width: 100%;
  margin: 1em 0;
  flex: ${props => props.flex};
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
  wordcloud: { [key: string]: Word[]; } | undefined;
  summarize: { [key: string]: string; } | undefined;
  aspectReview: AspectReview | undefined;
  onClick: Function;
}

// fake carousel
let items = [1, 2, 3, 4, 5, 6, 7, 8, 9].map( i => (
  {
    name: `Random Name #${i} Random Name #${i} Random Name #${i} Random Name #${i}`,
    description: `餐廳好吃 房間舒適
    飯店整體裝潢高雅 高貴 設施一流,服務很好 餐廳又很好吃!!!實在是太迷人
     地理位置又好 ,來到台北妳一定要選擇的一流五星級飯店!!
     餐廳好吃 房間舒適
    飯店整體裝潢高雅 高貴 設施一流,服務很好 餐廳又很好吃!!!實在是太迷人
     地理位置又好 ,來到台北妳一定要選擇的一流五星級飯店!!
     餐廳好吃 房間舒適
    飯店整體裝潢高雅 高貴 設施一流,服務很好 餐廳又很好吃!!!實在是太迷人
     地理位置又好 ,來到台北妳一定要選擇的一流五星級飯店!!`,
    star: 9.9
  }
));


// fake word cloud
const words = [
  { text: '飯店', value: 0.64 },
  { text: '房間', value: 0.11 },
  { text: '早餐', value: 0.16 },
  { text: '乾淨', value: 0.17 },
  { text: '舒適', value: 0.88 },
  { text: '安靜', value: 0.15 },
  { text: '隔音', value: 0.28 },
  { text: '景觀', value: 0.81 },
  { text: '好吃', value: 0.36 },
  { text: '便利', value: 0.25 },
]


export function SentimentRatioCard(props: SentimentRatioCardProps) {
  const { data, wordcloud, summarize, aspectReview } = props;

  const [aspect, setAspect] = useState<string>("房間");
  const [sentimentIdx, setSentimentIdx] = useState<number>(1);
  const sentiment = ['正向', '中性', '負向'];
  const [carouselItems, setCarouselItems] = useState<object[]>();

  useEffect(() => {
    setCarouselItems(getCarousel(aspectReview, aspect, sentimentIdx));
  }, [aspect, sentimentIdx])

  const handleAspectChange = (
    event: React.MouseEvent<HTMLElement>,
    newAspect: string,
  ) => {
    setAspect(newAspect);
  };

  const getChart = (sentiments: SentimentRatio[]|undefined, aspect: string|number) => {
    const data = sentiments?.find(s => s.aspect === aspect);
    if (!data) return [];
    return ([
      {title: '正向', value: data.positive, color: '#60C35E'},
      {title: '中性', value: data.neutral, color: '#D9D9D9'},
      {title: '負向', value: data.negative, color: '#FF9432'}
    ]);
  };

  const getCarousel = (aspectReview: AspectReview|undefined, aspect: string, sentimentIdx: number) => {
    if (!aspectReview) return [];
    if (sentimentIdx === 0) return aspectReview[aspect].filter(r => r.star >= 10.0).slice(0, 9).map(({title, good_text, star}) => { return {name: title, description: good_text, star} });
    if (sentimentIdx === 1) return aspectReview[aspect].filter(r => r.star >= 7.6 && r.star < 10.0).slice(0, 9).map(({title, normal_text, star}) => { return {name: title, description: normal_text, star} });
    if (sentimentIdx === 2) return aspectReview[aspect].filter(r => r.star < 7.6).slice(0, 9).map(({title, bad_text, star}) => { return {name: title, description: bad_text, star} });
  };

  const Item = ({item}: any) => {
    let right = undefined;
    const left = (
      <Paper className='item'>
        <Wrap style={{ margin: 0, justifyContent: 'space-between', alignItems: 'center' }}>
          <b className='title' style={{margin: 0}}>{item[0].name}</b>
          <Chip label={item[0].star} color="info" variant='outlined' />
        </Wrap>
        <p className='content'>{item[0].description}</p>
      </Paper>
    );

    if (item[1]) {
      right = (
        <Paper className='item'>
          <Wrap style={{ margin: 0, justifyContent: 'space-between', alignItems: 'center' }}>
            <b className='title' style={{margin: 0}}>{item[1].name}</b>
            <Chip label={item[1].star} color="info" variant='outlined' />
          </Wrap>
          <p className='content'>{item[1].description}</p>
        </Paper>
      );
    } else {
      right = (
        <Paper className='item' style={{display: 'flex', justifyContent: 'center'}}>
          <Button
            variant='outlined'
            endIcon={<ArrowForwardIcon />}
            onClick={() => props.onClick(aspect)}
            style={{alignSelf: 'center'}}
          >{aspect + "相關評論"}</Button>
        </Paper>
      );
    }

    return <Wrap className='items'>{left}{right}</Wrap>;
  }

  const callbacks = {
    getWordTooltip: (word:any) => `${word.text} (tf-idf=${word.value})`,
  }

  return (
    <Card style={{ flex: 1, height: 1000, maxHeight: 1000}}>
      <Title style={{ paddingBottom: 0 }}>面向情感</Title>
      <Main disableOverflow={true}>
        <Wrap style={{height: '300px'}}>
          <SideDiv style={{ flex: 1, padding: "0 40px" }}>
            <ToggleButtonGroup
              color='info'
              value={aspect}
              exclusive
              onChange={handleAspectChange}
              aria-label="Platform"
            >
              {["房間", "早餐", "設備", "交通", "服務", "價格"].map((a, i) =>
                <ToggleButton value={a} key={i}>{a}</ToggleButton>
              )}
            </ToggleButtonGroup>
            <div style={{margin:'1.5em 1em 0 1em'}}>
              <b>正向評論摘要</b>
              <p>{summarize ? summarize[aspect+"_正"] : null}</p>
              <b>中性評論摘要</b>
              <p>{summarize ? summarize[aspect+"_中"] : null}</p>
              <b>負向評論摘要</b>
              <p>{summarize ? summarize[aspect+"_負"] : null}</p>
            </div>
          </SideDiv>
          <SideDiv style={{ flex: 1, alignItems: 'center' }}>
            <ChartContainer>
              <Chart data={getChart(data, aspect)} sentimentIdx={sentimentIdx} setSentimentIdx={setSentimentIdx} />
            </ChartContainer>
            <p style={{color: '#C0C0C0'}}>點擊查看不同情感</p>
          </SideDiv>
        </Wrap>
        <div style={{width: '88%'}}>
          <Divider>{ aspect + ' - ' + sentiment[sentimentIdx] + "相關評論" }</Divider>
        </div>
        <Wrap style={{justifyContent: 'center', margin: 0}}>
          <Carousel
            className='carousel'
            height={200}
            animation='slide'
            autoPlay={false}
            fullHeightHover={false}
            navButtonsAlwaysVisible
            navButtonsProps={{
              style: {
                  color: '#464646',
                  backgroundColor: '#D9D9D900'
              }
            }} 
            indicatorContainerProps={{
              style: {
                  marginTop: '15px'
              }
            }}
          >
            {
              carouselItems ?
              Array.from(Array(Math.ceil(carouselItems.length/2)).keys()).map((_, i) =>
                <Item item={carouselItems.slice(i*2, i*2+2)} key={"view"+i} />
              ) : null 
            }
          </Carousel>
        </Wrap>
        <div style={{width: '88%', marginTop: '1.5em'}}>
          <Divider>{ aspect + ' - ' + sentiment[sentimentIdx] + "關鍵字" }</Divider>
        </div>
        <Wrap flex={1} style={{justifyContent: 'center'}}>
          <CloudContainer>
            <ReactWordcloud
              words={wordcloud ? wordcloud[aspect+'＿'+sentiment[sentimentIdx][0]] : []}
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
