import { Aspect } from "../../models/Aspect";
import { Sentiment } from "../../models/Sentiment";

const asects: Aspect = {
  房間: {
    乾淨: Sentiment.positive,
    舒適: Sentiment.positive,
    放鬆: Sentiment.positive,
    不錯: Sentiment.common,
    一般: Sentiment.common,
  },
  早餐: {
    好吃: Sentiment.positive,
    划算: Sentiment.positive,
    普通: Sentiment.common,
    不錯: Sentiment.common,
    油膩: Sentiment.negative,
  },
  游泳池: {
    乾淨: Sentiment.positive,
    漂亮: Sentiment.positive,
    冷: Sentiment.common,
  },
  停車: {
    便利: Sentiment.positive,
    遠: Sentiment.negative,
  },
  交通: {
    便利: Sentiment.positive,
    快速: Sentiment.positive,
  },
};

export default asects;
