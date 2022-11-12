import styled from "styled-components";
import { Card, Main, Title } from "./Components";
import ArrowForwardIcon from "@mui/icons-material/East";
import { Button } from "@mui/material";
import { AspectReview } from "../../../models/AspectReview";
import { useEffect, useState } from "react";

const VerticalLine = styled.div`
  border-left: 2px solid #464646;
  height: 100%;
  position: sticky;
  left: 50%;
  margin-left: -1px;
  top: 0;
`;

const SideDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 0 1em 1em 1em;
  height: 100%;
`;

const SideRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding-bottom: 0.9em;
`;

const IconDiv = styled(Button)`
  font-size: 20px;
  border: 1px solid #464646;
  border-radius: 10px;
  padding: 0.1em 0.4em 0 0.4em;

  &:hover {
    color: white;
    background-color: #464646;
  }
`;

export function AspectReviewCard(props: {
  onClick: Function;
  aspect?: AspectReview;
}) {
  // const aspects = [
  //   "房間",
  //   "早餐",
  //   "游泳池",
  //   "停車",
  //   "交通",
  //   "浴室",
  //   "景觀",
  //   "服務",
  //   "健身房",
  //   "晚餐",
  // ];
  const [mid, setMid] = useState(0);
  const [left, setLeft] = useState<string[]>([]);
  const [right, setRight] = useState<string[]>([]);
  // const mid = Math.round(Object.keys(props.aspect).length / 2);
  // const left = Object.keys(props.aspect).slice(0, mid);
  // const right = Object.keys(props.aspect).slice(mid);
  useEffect(() => {
    if (props.aspect) {
      const mid = Math.round(Object.keys(props.aspect).length / 2);
      setLeft(Object.keys(props.aspect).slice(0, mid));
      setRight(Object.keys(props.aspect).slice(mid));
    }
  }, [props]);

  return (
    <Card style={{ flex: 6 }}>
      <Title>面向相關評論</Title>
      <Main
        style={{
          paddingTop: "0.5em",
          position: "relative",
          flexDirection: "row",
        }}
      >
        <SideDiv>
          {left.map((aspect, i) => (
            <SideRow key={i}>
              <div>{aspect}</div>
              <IconDiv onClick={() => props.onClick(aspect)}>
                <ArrowForwardIcon />
              </IconDiv>
            </SideRow>
          ))}
        </SideDiv>
        <VerticalLine />
        <SideDiv>
          {right.map((aspect, i) => (
            <SideRow key={i}>
              <div>{aspect}</div>
              <IconDiv onClick={() => props.onClick()}>
                <ArrowForwardIcon />
              </IconDiv>
            </SideRow>
          ))}
        </SideDiv>
      </Main>
    </Card>
  );
}
