import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tag from "../../components/Tag";
import { Hotel } from "../../models/Hotel";

interface HotelCardProps {
  item?: Hotel | undefined;
  style?: React.CSSProperties | undefined;
}

const Title = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  :hover {
    text-decoration: underline;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  align-items: center;
  margin: 5px;
  width: 240;
  // background: red;
`;

const Scroll = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  flex-direction: row;
  align-items: center;
  height: 30px;
  &::-webkit-scrollbar {
    height: 1px;
  }
`;
const Text = styled.p`
  height: 20px;
`;
const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const Container = (props: { children: any }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 292,
      }}
    >
      {props.children}
    </div>
  );
};

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
    <Container>
      <Box
        style={{
          height: 360,
          width: 280,
          background: "#FFFFFF",
          marginTop: 12,
          // marginLeft: 12,
        }}
      >
        <img
          src={props?.item?.Home_Image}
          style={{ height: 176.204, width: 280 }}
        ></img>
        <div style={{ width: 240, margin: "auto" }}>
          <Title title={props?.item?.Name || undefined} onClick={onClick}>
            {props?.item?.Name}
            {/* <Reminder>{props?.item?.Name}</Reminder> */}
          </Title>

          <Row>
            <Icon src={require("../../assets/location.png")} />
            <Text>
              {props?.item?.District}, {props?.item?.County}
            </Text>
          </Row>
          <Row>
            <Icon src={require("../../assets/advantage.png")} />
            <Scroll>
              {props?.item?.Advantage?.map((item) => {
                return (
                  <Tag
                    title={item}
                    style={{
                      fontSize: 14,
                      height: 20,
                      justifyContent: "center",
                      marginRight: 9,
                      padding: 2,
                    }}
                  />
                );
              })}
            </Scroll>
          </Row>
          <Row>
            <Icon src={require("../../assets/disadvantage.png")} />
            <Scroll>
              {props?.item?.Disadvantage?.map((item) => {
                return (
                  <Tag
                    title={item}
                    style={{
                      fontSize: 14,
                      height: 20,
                      justifyContent: "center",
                      marginRight: 9,
                      padding: 2,
                    }}
                  />
                );
              })}
            </Scroll>
          </Row>
        </div>
      </Box>
    </Container>
  );
}
