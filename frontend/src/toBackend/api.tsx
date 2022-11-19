import { Hotel } from "../models/Hotel";
import axios from "./axios";
import { SentimentRatio } from "../models/SentimentRatio";
import { Aspect } from "../models/Aspect";
import { AspectReview } from "../models/AspectReview";
import { ScoreCnt } from "../models/ScoreCnt";
import { AmountData } from "../models/AmountData";

export async function getHotels() {
  return await axios.get("/hotels").then((res) => {
    console.log("res", res.data);
    return res.data as Hotel[];
  });
}

async function getHotel(hotelId: string) {
  return await axios.get(`/hotels/${hotelId}`).then((res) => res.data);
}

export async function getHotelContent(hotelId: string) {
  return await axios.get(`/hotels/content/${hotelId}`).then((res) => {
    return res.data as Aspect;
  });
}

export async function getSentimentRatio(hotelId: string) {
  const { sentiment_ratio }: { sentiment_ratio: SentimentRatio[] } =
    await getHotel(hotelId);
  return sentiment_ratio;
}

export async function getKeyword(hotelId: string) {
  const { keyword }: { keyword: { [key: string]: number; } } = await getHotel(hotelId);
  return keyword;
}

export async function getHotelAspect(hotelId: string) {
  return await axios.get(`/hotels/aspect/${hotelId}`).then((res) => {
    // console.log(res.data);
    return res.data as AspectReview;
  });
}

// async function getAspectReview(hotelId: string) {
//   return await axios.get(`/hotels/aspect/${hotelId}`).then((res) => res.data);
// }

// export async function getFixedAspect(hotelId: string) {
//   const aspect_review = await getAspectReview(hotelId);
//   return Object.keys(aspect_review);
// }

export async function getAmount(hotelId: string) {
  return await axios
    .get(`/hotels/amount/${hotelId}`)
    .then((res) => res.data as AmountData[]);
}

export async function getScoreCnts(hotelId: string) {
  const amount = await getAmount(hotelId);
  const stars = amount.map((r: any) => r.star);

  let scoreCnts = {
    _8up: 0,
    _6up: 0,
    _4up: 0,
    _2up: 0,
    _0up: 0,
  } as ScoreCnt;

  for (let i = 0; i < stars.length; i++) {
    if (stars[i] >= 8) {
      scoreCnts._8up += 1;
    } else if (stars[i] >= 6) {
      scoreCnts._6up += 1;
    } else if (stars[i] >= 4) {
      scoreCnts._4up += 1;
    } else if (stars[i] >= 2) {
      scoreCnts._2up += 1;
    } else {
      scoreCnts._0up += 1;
    }
  }

  return scoreCnts as object;
}
