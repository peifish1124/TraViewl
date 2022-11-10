import styled from "styled-components";
import { Blank, Card, Keyword, Title } from "./Components";

const KMain = styled.div`
  display: flex;
  padding: 0 2.5em 1.5em 2.5em;
  flex-wrap: wrap;
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }
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
      <Blank></Blank>
    </Card>
  );
}
