import styled from "styled-components";
import { Aspect } from "../../../models/Aspect";
import { Sentiment } from "../../../models/Sentiment";
import {
  Blank,
  Card,
  Keyword,
  Main,
  SRow,
  SText,
  Title,
  TitleRight,
} from "./Components";

const OpinionsDiv = styled.div`
  flex: 12;
  display: flex;
  jusitfy-content: center;
  align-items: center;
`;
interface AspectCardProps {
  items: Aspect;
}

interface CircleStyled {
  background?: Sentiment;
}
const Circle = styled.div<CircleStyled>`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background-color: ${(props?) => {
    if (props) {
      switch (props.background) {
        case Sentiment.positive:
          return "rgba(96, 196, 94, 0.2);";
        case Sentiment.common:
          return "#F5F5F5";
        case Sentiment.negative:
          return "rgba(255, 148, 50, 0.2);";
      }
    }
    return "#F5F5F5";
  }};
`;

export function AspectCard(props: AspectCardProps) {
  return (
    <Card style={{ flex: 1, position: "relative" }}>
      <Title>面向內容</Title>
      <TitleRight>
        <Circle background={Sentiment.positive} />
        <p>正向</p>
        <Circle background={Sentiment.common} style={{ margin: 10 }} />
        <p>中性</p>
        <Circle background={Sentiment.negative} style={{ margin: 10 }} />
        <p>負向</p>
      </TitleRight>
      <Main>
        {Object.keys(props.items).map((aspect, i) => (
          <SRow key={i} style={{ alignItems: "center" }}>
            <SText style={{ flex: 1 }}>{aspect}</SText>
            <OpinionsDiv>
              {Object.keys(props.items[aspect]).map((opinion, j) => (
                <Keyword key={i+'-'+j} background={props.items[aspect][opinion]}>
                  {opinion}
                </Keyword>
              ))}
            </OpinionsDiv>
          </SRow>
        ))}
      </Main>
      <Blank></Blank>
    </Card>
  );
}
