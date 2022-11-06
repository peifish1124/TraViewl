import { Container } from "@mui/material";
import styled from "styled-components";

export const Background = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #d1d1d1;
  width: 100%;
  align-items: center;
`;

export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  min-width: 500px;
  background: transparent;
  align-items: center;
`;

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MainDiv = styled.div`
  display: flex;
  flex: 7;
  max-width: 900px;
  min-width: 312.5px;
  //height: 100px;
  background: transparent;
  align-items: center;
  // justify-content: center;
  margin-top: 170px;
`;

export const RightDiv = styled.div`
  flex: 3;
  //display: flex;
  background-color: transparent;
  max-width: 500px;
  min-width: 187.5px;
`;
