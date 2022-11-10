import { SentimentRatio } from "../../../models/SentimentRatio";
import {
  Bar,
  Card,
  Main,
  Reminder,
  SBarDiv,
  SRow,
  SText,
  Title,
} from "./Components";

interface SentimentRatioCardProps {
  data?: SentimentRatio[] | undefined;
}

export function SentimentRatioCard(props?: SentimentRatioCardProps) {
  const data = props?.data;

  return (
    <Card style={{ flex: 3, marginRight: "1em" }}>
      <Title style={{ paddingBottom: 0 }}>面向情感</Title>
      <Main>
        {data?.map((row) => (
          <SRow key={row.aspect}>
            <SText>{row.aspect}</SText>
            <SBarDiv>
              <Bar bgColor="#60C35E" flex={row.positive}>
                <Reminder>正向, {row.positive}%</Reminder>
              </Bar>
              <Bar bgColor="#D9D9D9" flex={row.neutral}>
                <Reminder>中性, {row.neutral}%</Reminder>
              </Bar>
              <Bar bgColor="#FF9432" flex={row.negative}>
                <Reminder>負向, {row.negative}%</Reminder>
              </Bar>
            </SBarDiv>
          </SRow>
        ))}
      </Main>
    </Card>
  );
}
