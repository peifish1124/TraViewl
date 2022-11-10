import styled from "styled-components";
import { Aspect } from "../../../models/Aspect";
import { Card, Keyword, Main, SRow, SText, Title } from "./Components";

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
