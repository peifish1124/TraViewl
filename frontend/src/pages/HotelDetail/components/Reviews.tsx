import { Backdrop, Button, ClassNameMap, Toolbar } from "@mui/material";
import styled from "styled-components";
import { RightDiv } from "../../../components/Pages";
import TopBar from "../../../components/TopBar";
import { Review } from "../../../models/AspectReview";
import { DateTime } from "luxon";
import { Card, SRow, Title, TitleRight } from "./Components";

const RCard = (props: { children: any }) => {
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

function ReviewCard(props: { item?: Review }) {
  return (
    <RCard>
      <LeftCard>
        <Circle score={props.item?.star || 0} />
        <SRow style={{ justifyContent: "center", alignItems: "center" }}>
          <img
            src={require("../../../assets/Time.png")}
            height={24}
            width={24}
          ></img>
          <InfoContent>
            {DateTime.fromHTTP(props.item?.time || "").toFormat("yyyy-MM-dd")}
          </InfoContent>
        </SRow>
      </LeftCard>
      <Line />
      <RightCard>
        <Title style={{ color: "black" }}>{props.item?.title}</Title>
        <ReviewContent>{props.item?.normal_text}</ReviewContent>
      </RightCard>
    </RCard>
  );
}

export function Reviews(props: {
  classes: ClassNameMap;
  coverShow: boolean;
  data?: Review[];
  setCoverShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log("data", props.data || 0);
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
          <Button onClick={() => props.setCoverShow(false)}>
            <img
              src={require("../../../assets/Cross.png")}
              height={70}
              width={70}
            />
          </Button>
        </TitleRight>
        <Toolbar></Toolbar>
        <>
          {props.data
            ? props.data.map((item) => <ReviewCard item={item} />)
            : null}
        </>
      </div>
    </Backdrop>
  );
}
