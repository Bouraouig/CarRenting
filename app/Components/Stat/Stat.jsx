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
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Stat = ({ title, data, labels, backgroundColors, Answered, number }) => {
  const [dataToShow, setdataToShow] = useState([]);
  const [percentage, setpercentage] = useState([]);

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: " ",
      },
    },
  };

  const yesNoColor = ["#27ae60", "#e74c3c"];
  const handledata = () => {
    if (typeof data == "object") {
      setdataToShow(() => {
        return Object.values(data).map((el, index) => {
          let newData = {
            label: `${labels[index]} (${el})`,
            data: [el],
            backgroundColor: backgroundColors[index],
          };

          return newData;
        });
      });
    } else if (typeof data == "number") {
      setdataToShow(() => {
        let newData = [
          {
            label: `Oui (${data})`,
            data: [data],
            backgroundColor: "#27ae60",
          },
          {
            label: `Non (${Answered - data})`,
            data: [Answered - data],
            backgroundColor: "#e74c3c",
          },
        ];
        return newData;
      });
    }
  };
  const handlePercentage = () => {
    setpercentage([]);
    if (typeof data == "object") {
      let total = 0;
      Object.values(data).map((el) => (total += el));
      setpercentage((prev) =>
        Object.values(data).map((el) => [
          ...prev,
          ((el / total) * 100).toFixed(2),
        ])
      );
    } else if (typeof data == "number") {
      let per = ((data / Answered) * 100).toFixed(2);
      setpercentage([per, (100 - per).toFixed(2)]);
    }
  };
  const barData = {
    labels: [""],
    datasets: dataToShow,
  };
  useEffect(() => {
    handledata();
  }, [data, Answered]);
  useEffect(() => handlePercentage(), [data, Answered]);

  return (
    <div
      className="p-10"
      style={{
        background: "white",
        textAlign: "right",
        height: "55vh",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 30 }}>:{title}</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "55%",
          marginTop: 30,
          width: "100%",
        }}
      >
        <Bar
          id={`bar${number}`}
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
          marginTop: 10,
        }}
      >
        {labels.map((el, index) => (
          <div
            style={{
              color:
                labels.length != 2
                  ? backgroundColors[index]
                  : yesNoColor[index],
            }}
          >
            {`${percentage[index]}% :`} {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stat;
