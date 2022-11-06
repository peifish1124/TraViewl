import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Hotel } from "../../models/Hotel";

interface HotelCardProps {
  item?: Hotel | undefined;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
`;
const Text = styled.p`
  height: 20px;
`;
const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

export function HotelCard(props?: HotelCardProps) {
  useEffect(() => {
    // console.log("Components");
  });
  return (
    <Box
      style={{ height: 321.6, width: 246, background: "#FFFFFF", margin: 12 }}
    >
      <img
        src={require("../../assets/temp/hotelProfile.png")}
        style={{ height: 146.204, width: 246 }}
      ></img>
      <div style={{ margin: 5 }}>
        <h3>{props?.item?.Name}</h3>
        <Row>
          <Icon src={require("../../assets/location.png")} />
          <Text>
            {props?.item?.District}, {props?.item?.County}
          </Text>
        </Row>
        <Row>
          <Icon src={require("../../assets/advantage.png")} />
        </Row>
        <Row>
          <Icon src={require("../../assets/disadvantage.png")} />
        </Row>
      </div>
    </Box>
  );
}
