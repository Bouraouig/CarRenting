import React, { useEffect, useState } from "react";
import { createAPIEndpoint } from "../API/authenticated.request";

const Percentage = ({ data, airline }) => {
  const [Total, setTotal] = useState(0);
  const [AirlineTitle, setAirlineTitle] = useState("");

  useEffect(() => {
    airline &&
      createAPIEndpoint(`Airline`)
        .fetchById(data.id)
        .then((res) => setAirlineTitle(res.data.name))
        .catch((err) => console.log(err));
    setTotal(data.bad + data.acceptable + data.good);
  }, [data]);
  return (
    <div
      style={{
        background: "white",
        textAlign: "right",
        padding: 10,
        width: "100%",
      }}
    >
      <div style={{ textAlign: "left" }}>
        {airline ? (
          <h4>
            {AirlineTitle} ({data.good + data.acceptable + data.bad})
          </h4>
        ) : (
          <h4>
            {data.name} ({data.good + data.acceptable + data.bad})
          </h4>
        )}
      </div>
      {Total != 0 && (
        <div
          style={{
            height: 20,
            marginTop: 3,
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(data.good / Total) * 100}%`,
              background: "green",
              textAlign: "center",
              color: "white",
            }}
          >
            {((data.good / Total) * 100).toFixed(2)}%
          </div>
          <div
            style={{
              height: "100%",
              width: `${(data.acceptable / Total) * 100}%`,
              background: "orange",
              textAlign: "center",
              color: "white",
            }}
          >
            {((data.acceptable / Total) * 100).toFixed(2)}%
          </div>
          <div
            style={{
              color: "white",
              textAlign: "center",
              width: `${(data.bad / Total) * 100}%`,
              background: "red",
              fontSize: 13,
            }}
          >
            {((data.bad / Total) * 100).toFixed(2)}%
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-evenly",
        }}
      >
        <label
          style={{
            width: 20,
            background: "green",
            height: 10,
            marginRight: 5,
          }}
        />
        {((data.good / Total) * 100).toFixed(2)}%
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-evenly",
        }}
      >
        <label
          style={{
            width: 20,
            background: "orange",
            height: 10,
            marginRight: 5,
          }}
        />
        {((data.acceptable / Total) * 100).toFixed(2)}%
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-evenly",
        }}
      >
        <label
          style={{
            width: 20,
            background: "red",
            height: 10,
            marginRight: 5,
          }}
        />
        {((data.bad / Total) * 100).toFixed(2)}%
      </div>
    </div>
  );
};

export default Percentage;
