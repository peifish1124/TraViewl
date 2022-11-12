export interface Review {
  bad_text: string;
  good_text: string;
  importance: number;
  language: string;
  normal_text: string;
  star: number;
  time: string;
  title: string;
}

export interface AspectReview {
  [aspect: string]: Review[];
}
