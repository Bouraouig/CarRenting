import React from "react";
import { Button } from "rsuite";

const StatButton = ({ data, backgroundColors, backgroundColor }) => {
  return (
    <Button
      appearance="primary"
      style={{
        backgroundColor: backgroundColors
          ? backgroundColors[data.key]
          : backgroundColor,
        fontWeight: 500,
        minWidth: 150,
        color: "white",
        display: "grid",
        fontSize: 15,
      }}
    >
      <span style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}>
        {data.value}
      </span>
      <span style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}>
        {data.label}
      </span>
    </Button>
  );
};

export default StatButton;

///------------------------- Exemples data
{
  /*  {
   key:index
    label: "",
    value: res.data.data.filter(
      (el) => el.customer.customerType != 2 && el.surrveyState == 0
    ).length,
  }*/
}
