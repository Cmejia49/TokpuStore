import React from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import {Chart as chartjs} from 'chart.js/auto'


const LineChart = ({options,data}) => {
  return (
    <>
         <Line options={options} data={data} />
    </>
  )
}

export default LineChart;
