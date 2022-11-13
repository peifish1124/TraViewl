import { Toolbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import hotels from "../../assets/temp/hotel";
import { Background } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import TopBar from "../../components/TopBar";
import { Hotel } from "../../models/Hotel";
import { getHotels } from "../../toBackend/api";
import { HotelCard } from "./Components";

const Wrap = (props: { children: any }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        width: 876,
        flexWrap: "wrap",
        margin: "auto",
      }}
    >
      {props.children}
    </div>
  );
};
export default function Home() {
  const [hotels, setHotels] = useState<Hotel[] | null>(null);
  useEffect(() => {
    const asyncFuntion = async () => {
      const hotelDatas = await getHotels();
      console.log(hotelDatas);
      setHotels(hotelDatas);
    };
    asyncFuntion();
  }, []);
  return (
    <>
      <TopBar></TopBar>
      <Toolbar></Toolbar>
      <TitleBar title="飯店列表"></TitleBar>
      <Background
        style={{ minHeight: window.innerHeight, justifyContent: "center" }}
      >
        <Wrap>
          {hotels ? hotels.map((item) => <HotelCard item={item} />) : null}
        </Wrap>
      </Background>
    </>
  );
}
