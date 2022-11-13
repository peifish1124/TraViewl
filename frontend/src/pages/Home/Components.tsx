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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
    navigate("/hotelDetail", {
      state: {
        _id: props?.item?._id,
        Home_Image: props?.item?.Home_Image,
        Name: props?.item?.Name,
      },
    });
  };
  return (
    <Box
      style={{
        height: 360,
        width: 280,
        background: "#FFFFFF",
        marginTop: 12,
      }}
    >
      <img
        src={props?.item?.Home_Image}
        style={{ height: 176.204, width: 280 }}
      ></img>
      <div style={{ width: 240, margin: "auto" }}>
        <Title onClick={onClick}>{props?.item?.Name}</Title>
        <Row style={{ marginTop: 10 }}>
          <Icon src={require("../../assets/location.png")} />
          <Text>
            {props?.item?.District}, {props?.item?.County}
          </Text>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Icon src={require("../../assets/advantage.png")} />
          {props?.item?.Advantage?.map((item) => {
            return (
              <Tag
                title={item}
                style={{ fontSize: "15px", width: "70px", marginLeft: 2 }}
              />
            );
          })}
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Icon src={require("../../assets/disadvantage.png")} />
          {props?.item?.Disadvantage?.map((item) => {
            return (
              <Tag title={item} style={{ fontSize: "15px", marginLeft: 2 }} />
            );
          })}
        </Row>
      </div>
    </Box>
  );
}
