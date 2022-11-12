import { Hotel } from "../models/Hotel";
import axios from "./axios";
import { SentimentRatio } from "../models/SentimentRatio";
import { Aspect } from "../models/Aspect";

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
  const { keyword }: { keyword: string[] } = await getHotel(hotelId);
  return keyword;
}
