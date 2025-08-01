import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale)

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
    datasets: [
      {
        label: "Sales Analytics",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(57, 128, 192, 0.2)",
        borderColor: "#3980c0",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#3980c0",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3980c0",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
      },
      {
        label: "Monthly Earnings",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(235, 239, 242, 0.2)",
        borderColor: "#ebeff2",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#ebeff2",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#ebeff2",
        pointHoverBorderColor: "#eef0f2",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
      }
    ]
  };

  return (
    <React.Fragment>
      <Line width={490} height={185} data={data} className="chartjs-chart" />
    </React.Fragment>
  );
};

export default LineChart;
