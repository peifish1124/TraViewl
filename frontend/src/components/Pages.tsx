import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  margintop: 20px;
  flex-direction: row;
  background-position: fixed;
  overflow: auto;
  justify-content: center;
  background-color: transparent;
  @media (max-width: 1900px) {
    height: 70em;
  }
  @media (max-width: 1300px) {
    height: 70em;
  }
  &::-webkit-scrollbar {
    height: inherit;
    width: 7px;
    border-radius: 6px;
  }
`;
export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  // flex-direction: row;
  width: 80%;
  max-width: 1200px;
  min-width: 500px;
  height: 800px;
  background: transparent;
  align-items: center;
  // justify-content: center;
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
