import React from "react"
import ReactApexChart from "react-apexcharts"

const chartapex = () => {

  const data = {
    series: [
      { name: "High - 2018", data: [26, 24, 32, 36, 33, 31, 33] },
      { name: "Low - 2018", data: [14, 11, 16, 12, 17, 13, 12] },
    ],
    options: {
      chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
      colors: ["#3980c0", "#fa6374"],
      // dataLabels: { enabled: !0 },
      stroke: { width: [3, 3], curve: "straight" },
      title: { text: "Average High & Low Temperature", align: "left", style: { fontWeight: 500 } },
      grid: {
        row: { colors: ["transparent", "transparent"], opacity: 0.2 },
        borderColor: "#f1f1f1",
      },
      markers: { style: "inverted", size: 6 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: { text: "Month" },
      },
      yaxis: { title: { text: "Temperature" }, min: 5, max: 40 },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: !0,
        offsetY: -25,
        offsetX: -5,
      },
      responsive: [
        {
          breakpoint: 600,
          options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
        },
      ],
    },
  }

  return (
    <React.Fragment>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height="380"
        className="apex-charts"
      />
    </React.Fragment>
  )
}

export default chartapex;


