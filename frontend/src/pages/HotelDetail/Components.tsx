import { remToPx } from "polished";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTemplateSpan } from "typescript";
import { Aspect } from "../../models/Aspect";
import { SentimentRatio } from "../../models/SentimentRatio";
import Tag from "../../components/Tag";
import { Sentiment } from "../../models/Sentiment";
import { ScoreCnt } from "../../models/ScoreCnt";
export const TitleCard = styled.div`
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

//-----------------SentimentRatioCard-------------------------//
//------------------------------------------------------------//

interface SentimentRatioCardProps {
  data?: SentimentRatio[] | undefined;
}

interface IBarStyled {
  bgColor: string;
  flex: number;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 360px;
  max-height: 360px;
  color: #464646;
`;

const Title = styled.div`
  font-size: 24px;
  padding: 1em 1.5em;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
  flex: 1;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }
`;

const SRow = styled.div`
  display: flex;
  width: 85%;
  padding-top: 1.8em;
`;

const SText = styled.div`
  flex: 2;
  font-size: 20px;
  text-align: right;
  margin-right: 1.5em;
`;

const SBarDiv = styled.div`
  flex: 10;
  display: flex;
  justify-content: space-between;
`;

const Bar = styled.div<IBarStyled>`
  background-color: ${(props) => props.bgColor};
  flex: ${(props) => props.flex};
  margin: 0 2px;
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const Reminder = styled.p`
  position: absolute;
  top: -160%;
  background-color: #d9d9d9;
  white-space: nowrap;
  padding: 0 5px;
  display: none;
  font-size: 18px;

  ${Bar}:hover & {
    display: block;
  }
`;

export function SentimentRatioCard(props?: SentimentRatioCardProps) {
  const data = props?.data;

  return (
    <Card style={{ flex: 3, marginRight: "1em" }}>
      <Title style={{ paddingBottom: 0 }}>面向情感</Title>
      <Main>
        {data?.map((row) => (
          <SRow key={row.aspect}>
            <SText>{row.aspect}</SText>
            <SBarDiv>
              <Bar bgColor="#60C35E" flex={row.positive}>
                <Reminder>正向, {row.positive}%</Reminder>
              </Bar>
              <Bar bgColor="#D9D9D9" flex={row.neutral}>
                <Reminder>中性, {row.neutral}%</Reminder>
              </Bar>
              <Bar bgColor="#FF9432" flex={row.negative}>
                <Reminder>負向, {row.negative}%</Reminder>
              </Bar>
            </SBarDiv>
          </SRow>
        ))}
      </Main>
    </Card>
  );
}

//--------------------KeywordsCard----------------------------//
//------------------------------------------------------------//
const KMain = styled.div`
  display: flex;
  padding: 0 2.5em 1.5em 2.5em;
  flex-wrap: wrap;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }
`;
interface KeywordStyled {
  background?: Sentiment;
}
const Keyword = styled.p<KeywordStyled>`
  font-size: 20px;
  border: 1px solid #464646;
  border-radius: 10px;
  padding: 0.4em 0.8em;
  margin: 10px;
  background-color: ${(props?) => {
    if (props) {
      switch (props.background) {
        case Sentiment.positive:
          return "#60C35E";
        case Sentiment.common:
          return "#F5F5F5";
        case Sentiment.negative:
          return "#FF9432";
      }
    }
    return "#F5F5F5";
  }};
`;

interface KeywordsCardProps {
  data?: string[] | undefined;
}

export function KeywordsCard(props?: KeywordsCardProps) {
  const data = props?.data;

  return (
    <Card style={{ flex: 2 }}>
      <Title style={{ paddingBottom: "0.5em" }}>評論關鍵字</Title>
      <KMain>
        {data?.map((k) => (
          <Keyword key={k}>{k}</Keyword>
        ))}
      </KMain>
    </Card>
  );
}
//--------------------AspectCard----------------------------//
//----------------------------------------------------------//

const OpinionsDiv = styled.div`
  flex: 12;
  display: flex;
  jusitfy-content: center;
  align-items: center;
`;

interface AspectCardProps {
  items: Aspect;
}
export function AspectCard(props: AspectCardProps) {
  return (
    <Card style={{ flex: 1 }}>
      <Title>面向內容</Title>
      <Main>
        {Object.keys(props.items).map((aspect) => (
          <SRow style={{ alignItems: "center" }}>
            <SText style={{ flex: 1 }}>{aspect}</SText>
            <OpinionsDiv>
              {Object.keys(props.items[aspect]).map((opinion) => (
                <Keyword background={props.items[aspect][opinion]}>
                  {opinion}
                </Keyword>
              ))}
            </OpinionsDiv>
          </SRow>
        ))}
      </Main>
    </Card>
  );
}

//--------------------ScoresCard----------------------------//
//----------------------------------------------------------//

interface ScoreCardProps {
  data: object;
}

export function ScoresCard(props: ScoreCardProps) {
  const data = props.data;
  const arr = Object.values(data);
  const max = Math.max(...arr);
  const sum = arr.reduce((partialSum, a) => partialSum + a, 0);

  const getRows = (data: object, maxCnt: number) => {
    const k = {
      _8up: "8.0 - 10.0",
      _6up: "6.0 - 7.9",
      _4up: "4.0 - 5.9",
      _2up: "2.0 - 3.9",
      _0up: "0.0 - 1.9"
    };

    let result: any[] = [];
    Object.keys(k).map((key, i) => {
      const cnt: number = data[key as keyof object];
      const barWidth: number = Math.round(9000 * cnt / maxCnt);

      result[result.length] = (
        <SRow style={{ justifyContent: "flex-start", paddingTop: '1.5em' }} key={i}>
          <SText style={{ flex: 3 }}>{k[key as keyof object]}</SText>
          <SBarDiv>
            <Bar bgColor="#427FA0" flex={barWidth}></Bar>
            <Bar
              bgColor="white"
              flex={10000 - barWidth}
              style={{
                justifyContent: 'left',
                paddingLeft: 5
            }}>{cnt}</Bar>
          </SBarDiv>
        </SRow>
      )
    })

    return( result.map(row => row) );
  };

  return (
    <Card style={{ flex: 5, marginRight: "1em", position: 'relative' }}>
      <Title>分數統計</Title>
      <div style={{
        fontSize: 20,
        position: 'absolute',
        right: 36,
        top: 28
      }}>共 {sum} 則評論</div>
      
      <Main>
        {getRows(data, max)}
      </Main>
    </Card>
  );
}

//--------------------AspectReviewCard----------------------------//
//----------------------------------------------------------//

export function AspectReviewCard() {

  return (
    <Card style={{ flex: 6 }}>
      <Title>面向相關評論</Title>
      <Main>
        
      </Main>
    </Card>
  );
}