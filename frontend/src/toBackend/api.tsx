import axios from "./axios";

export async function getHotels() {
  return await axios.get("/hotels").then((res) => {
    console.log("res", res);
  });
}
