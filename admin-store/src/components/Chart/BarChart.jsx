import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import {Chart as chartjs} from 'chart.js/auto'

export const BarChart = ({options, data }) => {
  return (
    <div>
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};