import { remToPx } from "polished";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SentimentRatio } from "../../models/SentimentRatio";

//-----------------SentimentRatioCard-------------------------//
//------------------------------------------------------------//

interface SentimentRatioCardProps {
    data?: SentimentRatio[] | undefined;
}

interface IBarStyled {
    type: string;
    flex: number;
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 360px;
    max-height: 360px;
    color: #464646;
`;

const Title = styled.div`
    font-size: 24px;
    padding: 1em 1.5em;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1.5em;
    flex: 1;
    overflow: hidden;

    &:hover {
        overflow-y: auto;
    }
`;

const SRow = styled.div`
    display: flex;
    width: 85%;
    padding-top: 1.6em;
`;

const SText = styled.div`
    flex: 2;
    font-size: 20px;
    text-align: right;
    margin-right: 1.5em;
`;

const SBarDiv = styled.div`
    flex: 10;
    display: flex;
    justify-content: space-between;
`;

const Bar = styled.div<IBarStyled>`
    background-color: ${props => 
        props.type === "positive" ? "#60C35E" : (
        props.type === "negative" ? "#FF9432" : "#D9D9D9"
    )};
    flex: ${props => props.flex};
    margin: 0 2px;
    position: relative;
    display: flex;
    justify-content: center;
`

const Reminder = styled.p`
    position: absolute;
    top: -145%;
    background-color: #D9D9D9;
    white-space: nowrap;
    padding: 0 5px;
    display: none;
    
    ${Bar}:hover & {
        display: block;
    }
`;



export function SentimentRatioCard(props?: SentimentRatioCardProps) {
    const data = props?.data;

    return (
        <Card style={{"flex": 3, "marginRight": "1em"}}>
            <Title style={{"paddingBottom": 0}}>面向情感</Title>
            <Main>{data?.map((row) => (
                <SRow key={row.aspect}>
                    <SText>{row.aspect}</SText>
                    <SBarDiv>
                        <Bar type="positive" flex={row.positive}>
                            <Reminder>正向, {row.positive}%</Reminder>
                        </Bar>
                        <Bar type="neutral" flex={row.neutral}>
                            <Reminder>中性, {row.neutral}%</Reminder>
                        </Bar>
                        <Bar type="negative" flex={row.negative}>
                            <Reminder>負向, {row.negative}%</Reminder>
                        </Bar>
                    </SBarDiv>
                </SRow>
            ))}</Main>
        </Card>
    )
}

//--------------------KeywordsCard----------------------------//
//------------------------------------------------------------//

const KMain = styled.div`
    display: flex;
    padding: 0 2.5em 1.5em 2.5em;
    flex-wrap: wrap;
    overflow: hidden;

    &:hover {
        overflow-y: auto;
    }
`;

const Keyword = styled.p`
    font-size: 20px;
    border: 1px solid #464646;
    border-radius: 10px;
    padding: 0.4em 0.8em;
    margin: 10px;
`;

interface KeywordsCardProps {
    data?: string[] | undefined;
}

export function KeywordsCard(props?: KeywordsCardProps) {
    const data = props?.data;

    return (
        <Card style={{"flex": 2}}>
            <Title style={{"paddingBottom": "0.5em"}}>評論關鍵字</Title>
            <KMain>
                {data?.map(k => <Keyword key={k}>{k}</Keyword>)}
            </KMain>
        </Card>
    )
}