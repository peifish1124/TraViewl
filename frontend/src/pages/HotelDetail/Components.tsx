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

const SRC = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 360px;
    margin-right: 1em;
`;

const STitle = styled.div`
    font-size: 24px;
    padding: 1em 1.5em;
`;

const SMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.5em;
    flex: 1;
`;

const SRow = styled.div`
    display: flex;
    width: 80%;
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
`

export function SentimentRatioCard(props?: SentimentRatioCardProps) {
    const data = props?.data;

    return (
        <SRC>
            <STitle>面向情感</STitle>
            <SMain>{data?.map((row) => (
                <SRow key={row.aspect}>
                    <SText>{row.aspect}</SText>
                    <SBarDiv>
                        <Bar type="positive" flex={row.positive} />
                        <Bar type="neutral" flex={row.neutral} />
                        <Bar type="negative" flex={row.negative} />
                    </SBarDiv>
                </SRow>
            ))}</SMain>
        </SRC>
    )
}

//--------------------KeywordsCard----------------------------//
//------------------------------------------------------------//

const KC = styled.div`
        flex: 2;
        background-color: white;
        padding: 0em 1.5em;
        font-size: 24px;
        height: 360px;
    `;

export function KeywordsCard() {
    

    return (
        <KC>
            <p>評論關鍵字</p>
        </KC>
    )
}