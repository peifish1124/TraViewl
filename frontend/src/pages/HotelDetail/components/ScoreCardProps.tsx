import {
  Bar,
  Blank,
  Card,
  Main,
  SBarDiv,
  SRow,
  SText,
  Title,
  TitleRight,
} from "./Components";

interface ScoreCardProps {
  data: object;
}

export function ScoresCard(props: ScoreCardProps) {
  const data = props.data;
  const arr = Object.values(data);
  const max = Math.max(...arr);
  const sum = arr.reduce((partialSum, a) => partialSum + a, 0);

  const getRows = (data: object, maxCnt: number) => {
    const k = {
      _8up: "8.0 - 10.0",
      _6up: "6.0 - 7.9",
      _4up: "4.0 - 5.9",
      _2up: "2.0 - 3.9",
      _0up: "0.0 - 1.9",
    };

    let result: any[] = [];
    Object.keys(k).map((key, i) => {
      const cnt: number = data[key as keyof object];
      const barWidth: number = Math.round((9000 * cnt) / maxCnt);

      result[result.length] = (
        <SRow
          style={{ justifyContent: "flex-start", paddingTop: "1.5em" }}
          key={i}
        >
          <SText style={{ flex: 3 }}>{k[key as keyof object]}</SText>
          <SBarDiv>
            <Bar bgColor="#427FA0" flex={barWidth}></Bar>
            <Bar
              bgColor="white"
              flex={10000 - barWidth}
              style={{
                justifyContent: "left",
                paddingLeft: 5,
              }}
            >
              {cnt}
            </Bar>
          </SBarDiv>
        </SRow>
      );
    });

    return result.map((row) => row);
  };

  return (
    <Card style={{ flex: 5, marginRight: "1em", position: "relative" }}>
      <Title>分數統計</Title>
      <TitleRight>共 {sum} 則評論</TitleRight>
      <Main>{getRows(data, max)}</Main>
      <Blank></Blank>
    </Card>
  );
}
