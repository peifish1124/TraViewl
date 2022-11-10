import { useState } from "react";
import { AmountData } from "../../../models/AmountData";
import {
  Chart as ChartJS,
  Title as ChartTitle,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  ChartData,
  PointElement,
} from "chart.js";
import { Main, Title } from "./Components";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ChartTitle,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

interface AmountCardProps {
  data: AmountData[];
}

const ACard = (props: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        width: "100%",
        color: "#464646",
      }}
    >
      {props.children}
    </div>
  );
};

export function AmountCard(props: AmountCardProps) {
  const [data, setData] = useState<ChartData<"line", number[], string>>({
    labels: props.data.map((v) => v.time),
    datasets: [
      {
        data: props.data.map((v) => v.star),
        backgroundColor: "#427FA0",
        borderColor: "#427FA0",
        pointStyle: "circle",
      },
    ],
  });
  return (
    <ACard>
      <Title>關注度</Title>
      <Main disableOverflow={true}>
        <Line
          options={{
            scales: {
              x: {
                grid: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "評論數",
                  font: {
                    family: "Times",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
              },
              y: {
                grid: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "月份",
                  font: {
                    family: "Times",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
                min: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={data}
        ></Line>
      </Main>
    </ACard>
  );
}
