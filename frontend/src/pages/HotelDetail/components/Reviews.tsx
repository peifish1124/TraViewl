import { Backdrop, Button, ClassNameMap, Toolbar } from "@mui/material";
import styled from "styled-components";
import { RightDiv } from "../../../components/Pages";
import TopBar from "../../../components/TopBar";
import { Card, SRow, Title, TitleRight } from "./Components";

const ReviewCard = (props: { children: any }) => {
  return (
    <div
      style={{
        display: "flex",
        background: "#FFFFFF",
        alignItems: "center",
        width: "70%",
        margin: 30,
        flexDirection: "row",
      }}
    >
      {props.children}
    </div>
  );
};

const Circle = (props: { score: number }) => {
  return (
    <div
      style={{
        display: "flex",
        height: 90,
        width: 90,
        borderRadius: 45,
        background: "#4E82C0",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.score}
    </div>
  );
};

const LeftCard = (props: { children: any }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 219,
        flexDirection: "column",
        padding: 20,
      }}
    >
      {props.children}
    </div>
  );
};
const Line = styled.div`
  width: 2px;
  height: 90%;
  background: black;
`;

const RightCard = styled.div`
  flex: 1;
  height: 100%;
`;

const InfoContent = styled.p`
  font-size: 18px;
  color: #7e7e7e;
`;
const ReviewContent = styled.p`
  font-size: 18px;
  color: #7e7e7e;
  padding: 0em 2.25em;
`;

export function Reviews(props: {
  classes: ClassNameMap;
  coverShow: boolean;
  setCoverShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Backdrop className={props.classes.backdrop} open={props.coverShow}>
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 30,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0, .2)",
          zIndex: "1000",
          overflowY: "auto",
        }}
      >
        <TitleRight>
          <Button onClick={() => props.setCoverShow(false)}>X</Button>
        </TitleRight>
        <Toolbar></Toolbar>
        <ReviewCard>
          <LeftCard>
            <Circle score={9.1} />
            <SRow style={{ justifyContent: "center", alignItems: "center" }}>
              <img
                src={require("../../../assets/Time.png")}
                height={24}
                width={24}
              ></img>
              <InfoContent>2022-01-12</InfoContent>
            </SRow>
          </LeftCard>
          <Line />
          <RightCard>
            <Title style={{ color: "black" }}>12345</Title>
            <ReviewContent>123451---</ReviewContent>
          </RightCard>
        </ReviewCard>
      </div>
    </Backdrop>
  );
}
