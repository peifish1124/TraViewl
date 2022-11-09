import { remToPx } from "polished";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTemplateSpan } from "typescript";
import { Aspect } from "../../models/Aspect";
import { SentimentRatio } from "../../models/SentimentRatio";
import Tag from "../../components/Tag";
import { Sentiment } from "../../models/Sentiment";
import { AmountData } from "../../models/AmountData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title as ChartTitle,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  ChartData,
  PointElement,
} from "chart.js";

ChartJS.register(
  ChartTitle,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

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
  type: string;
  flex: number;
}

interface MainProps {
  disableOverflow?: boolean;
}

const Card = styled.div<MainProps>`
  display: flex;
  flex-direction: column;
  background-color: white;
  ${(props) => {
    if (!props.disableOverflow) {
      return "height: 360px;";
    }
  }}

  max-height: 360px;
  color: #464646;
`;

const Title = styled.div`
  font-size: 24px;
  padding: 1em 1.5em;
`;

const Main = styled.div<MainProps>`
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
  padding-top: 1.6em;
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
  background-color: ${(props) =>
    props.type === "positive"
      ? "#60C35E"
      : props.type === "negative"
      ? "#FF9432"
      : "#D9D9D9"};
  flex: ${(props) => props.flex};
  margin: 0 2px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Reminder = styled.p`
  position: absolute;
  top: -145%;
  background-color: #d9d9d9;
  white-space: nowrap;
  padding: 0 5px;
  display: none;

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
              <Bar type="positive" flex={row.positive}>
                <Reminder>正向, {row.positive}%</Reminder>
              </Bar>
              <Bar type="neutral" flex={row.neutral}>
                <Reminder>中性, {row.neutral}%</Reminder>
              </Bar>
              <Bar type="negative" flex={row.negative}>
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

//--------------------AmountCard----------------------------//
//----------------------------------------------------------//
interface AmountCardProps {
  data: AmountData[];
}

export function AmountCard(props: AmountCardProps) {
  const [data, setData] = useState<ChartData<"line", number[], string>>({
    labels: props.data.map((v) => v.time),
    datasets: [
      {
        data: props.data.map((v) => v.star),
        backgroundColor: "#427FA0",
        borderColor: "#427FA0",
        pointStyle: "circle",
      },
    ],
  });
  return (
    <Card style={{ flex: 1 }} disableOverflow={true}>
      <Title>關注度</Title>
      <Main disableOverflow={true} style={{ height: "290px" }}>
        <Line
          style={{ height: "270px", width: "80%" }}
          options={{
            scales: {
              x: {
                grid: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "評論數",
                  font: {
                    family: "Times",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
              },
              y: {
                grid: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "月份",
                  font: {
                    family: "Times",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
                min: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={data}
        ></Line>
      </Main>
    </Card>
  );
}
