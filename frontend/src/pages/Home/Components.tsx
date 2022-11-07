import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tag from "../../components/Tag";
import { Hotel } from "../../models/Hotel";

interface HotelCardProps {
  item?: Hotel | undefined;
}

const Title = styled.h3`
  :hover {
    text-decoration: underline;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
  margin: 5px;
`;
const Text = styled.p`
  height: 20px;
`;
const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

export function HotelCard(props?: HotelCardProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/hotelDetail", { state: props?.item?._id });
  };
  return (
    <Box
      style={{ height: 321.6, width: 246, background: "#FFFFFF", margin: 12 }}
    >
      <img
        src={require("../../assets/temp/hotelProfile.png")}
        style={{ height: 146.204, width: 246 }}
      ></img>
      <div style={{ margin: 5 }}>
        <Title onClick={onClick}>{props?.item?.Name}</Title>
        <Row>
          <Icon src={require("../../assets/location.png")} />
          <Text>
            {props?.item?.District}, {props?.item?.County}
          </Text>
        </Row>
        <Row>
          <Icon src={require("../../assets/advantage.png")} />
          {props?.item?.Advantage?.map((item) => {
            return <Tag title={item} style={{ marginLeft: 2 }} />;
          })}
        </Row>
        <Row>
          <Icon src={require("../../assets/disadvantage.png")} />
          {props?.item?.Disadvantage?.map((item) => {
            return <Tag title={item} style={{ marginLeft: 2 }} />;
          })}
        </Row>
      </div>
    </Box>
  );
}
