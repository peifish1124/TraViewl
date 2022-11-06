import { Toolbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import hotels from "../../assets/temp/hotel";
import { Background, CenterDiv, Wrap } from "../../components/Pages";
import TitleBar from "../../components/TitleBar";
import { HotelCard } from "./Components";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <>
      <Toolbar></Toolbar>
      <TitleBar title="飯店列表"></TitleBar>
      <Background>
        <CenterDiv>
          <Wrap>
            {hotels.map((item) => (
              <HotelCard item={item} />
            ))}
          </Wrap>
        </CenterDiv>
      </Background>
    </>
  );
}
