import { Sentiment } from "./Sentiment";

export interface Opinion {
  [adj: string]: Sentiment;
}

export interface Aspect {
  [noun: string]: Opinion;
}
