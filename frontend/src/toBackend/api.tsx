import { Hotel } from "../models/Hotel";
import axios from "./axios";

export async function getHotels() {
  return await axios.get("/hotels").then((res) => {
    console.log("res", res.data);
    return res.data as Hotel[];
  });
}
