import React, { useEffect, useRef, useState } from "react";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button } from "rsuite";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralStats = ({ data, backgroundColors, labels }) => {
  const [percentage, setPercentage] = useState([]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const barData = {
    labels: [""],
    datasets: data.map((el, index) => {
      let newData = {
        label: `${labels[el.key - 1]} ( ${el.count} )`,
        data: [el.count],
        backgroundColor: backgroundColors[el.key - 1],
      };

      return newData;
    }),
  };
  const Percentage = () => {
    let totalCount = 0;
    data.map((el, index) => {
      totalCount += el.count;
    });
    setPercentage(
      data.map((el) => {
        return {
          key: el.key,
          label: labels[el.key - 1],
          percentage: ((el.count / totalCount) * 100).toFixed(2),
        };
      })
    );
  };
  useEffect(() => Percentage(), [data]);
  // useEffect(() => {
  //   const canvas = document.getElementById("bar-chart-canvas");
  //   console.log(canvas);
  //   if (canvas) {
  //     const chartInstance = ChartJS.getChart(canvas); // Retrieve the chart instance
  //     if (chartInstance) {
  //       const base64Image = chartInstance.toBase64Image(); // Generate base64 imagea
  //       console.log(base64Image);
  //       // setOnChartReady(base64Image); // Pass base64 image back via callback
  //     }
  //   }
  // }, [data, setOnChartReady]);
  return (
    <div
      className="p-10"
      style={{
        background: "white",
        textAlign: "right",
        height: "65vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80%",
          marginTop: 30,
          width: "100%",
        }}
      >
        <Bar
          id="bar-chart-canvas"
          options={options}
          data={barData}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 8,
          width: "80%",
          margin: "auto",
        }}
      >
        {percentage.map((element, index) => {
          return (
            <span style={{ color: backgroundColors[element.key - 1] }}>
              {element.percentage}% :{element.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralStats;
