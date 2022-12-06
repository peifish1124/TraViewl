import React, { useState, ComponentProps } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
  sentimentIdx: number;
  setSentimentIdx: React.Dispatch<React.SetStateAction<number>>
};

function Chart({data, sentimentIdx, setSentimentIdx}: Props) {
//   const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const _data = data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: '#969696',
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      data={_data}
      radius={44}
      lineWidth={60}
      startAngle={-90}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === sentimentIdx ? 6 : 1)}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSentimentIdx(index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default Chart;