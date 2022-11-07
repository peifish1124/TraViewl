export interface Hotel {
  _id: string | undefined | null;
  Name: string | undefined | null;
  County: string | undefined | null;
  District: string | undefined | null;
  Advantage: string[] | undefined | null;
  Disadvantage: string[] | undefined | null;
  Keyword: any;
  Sentiment: any;
}
