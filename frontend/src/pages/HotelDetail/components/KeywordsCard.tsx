import styled from "styled-components";
import { Blank, Card, Keyword, Title } from "./Components";
import { Fragment } from "react";
import { relative } from "path";

const KMain = styled.div`
  display: flex;
  padding: 0 2.5em 1.5em 2.5em;
  flex-wrap: wrap;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }
`;

const KeywordDiv = styled.div`
  font-size: 20px;
  border: 1px solid #464646;
  border-radius: 10px;
  padding: 0.4em 0.8em;
  margin: 10px;
  background-color: #F5F5F5;
  }};
`;

const Count = styled.div`
  position: absolute;
  top: 28px;
  right: 36px;
  display: none;
  font-size: 20px;

  ${KeywordDiv}:hover & {
    display: block;
  }
`;


interface KeywordsCardProps {
  data?: { [key: string]: number; } | undefined;
}

export function KeywordsCard(props?: KeywordsCardProps) {
  const data = props?.data;
  const text = data ? Object.keys(data) : []


  return (
    <Card style={{ flex: 2, position: 'relative' }}>
      <Title style={{ paddingBottom: "0.5em" }}>評論關鍵字</Title>
      <KMain>
        {text.map((k, i) => (
          <Fragment key={i}>
            <KeywordDiv>
              {k}
              <Count>{data ? (k+': 提及 '+data[k]+' 次'): null}</Count>
            </KeywordDiv>
          </Fragment>
        ))}
      </KMain>
      <Blank></Blank>
    </Card>
  );
}
