import { SentimentRatio } from "../../models/SentimentRatio";

const sentimentRatios: SentimentRatio[] = [
    {
        aspect: "房間",
        positive: 30,
        neutral: 60,
        negative: 10
    },
    {
        aspect: "早餐",
        positive: 40,
        neutral: 50,
        negative: 10
    },
    {
        aspect: "游泳池",
        positive: 40,
        neutral: 40,
        negative: 20
    },{
        aspect: "停車",
        positive: 30,
        neutral: 20,
        negative: 50
    },{
        aspect: "交通",
        positive: 50,
        neutral: 40,
        negative: 10
    },{
        aspect: "健身房",
        positive: 50,
        neutral: 40,
        negative: 10
    }
]

export default sentimentRatios;