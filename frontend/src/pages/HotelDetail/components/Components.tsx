import styled from "styled-components";
import { Sentiment } from "../../../models/Sentiment";

export const TitleCard = styled.div`
  background-color: #ffffff;
  margin-top: -60px;
  font-size: 30px;
  padding: 60px;
  text-align: center;
  text-justify: auto;
  word-wrap: break-word;
  text-overflow: ellipsis;
  color: #464646;
  margin-bottom: 90px;
`;

interface IBarStyled {
  bgColor: string;
  flex: number;
}

interface MainProps {
  disableOverflow?: boolean;
}

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 360px;

  max-height: 360px;
  color: #464646;
`;

export const Title = styled.div`
  font-size: 24px;
  padding: 1em 1.5em;
`;

export const Main = styled.div<MainProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
  flex: 1;

  ${(props) => {
    if (!props.disableOverflow) {
      return "overflow: hidden; &:hover {overflow-y: auto;}";
    }
  }}
`;

export const SRow = styled.div`
  display: flex;
  width: 85%;
  padding-top: 1.8em;
`;

export const SText = styled.div`
  flex: 2;
  font-size: 20px;
  text-align: right;
  margin-right: 1.5em;
`;

export const SBarDiv = styled.div`
  flex: 10;
  display: flex;
  justify-content: space-between;
`;

export const Bar = styled.div<IBarStyled>`
  background-color: ${(props) => props.bgColor};
  flex: ${(props) => props.flex};
  margin: 0 2px;
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

export const Reminder = styled.p`
  position: absolute;
  top: -160%;
  background-color: #d9d9d9;
  white-space: nowrap;
  padding: 0 5px;
  display: none;
  font-size: 18px;

  ${Bar}:hover & {
    display: block;
  }
`;

interface KeywordStyled {
  background?: Sentiment;
}
export const Keyword = styled.p<KeywordStyled>`
  font-size: 20px;
  border: 1px solid #464646;
  border-radius: 10px;
  padding: 0.4em 0.8em;
  margin: 10px;
  background-color: ${(props?) => {
    if (props) {
      switch (props.background) {
        case Sentiment.positive:
          return "rgba(96, 196, 94, 0.2);";
        case Sentiment.common:
          return "#F5F5F5";
        case Sentiment.negative:
          return "rgba(255, 148, 50, 0.2);";
      }
    }
    return "#F5F5F5";
  }};
`;
