import React from "react";
import { useCubeQuery } from "@cubejs-client/react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; 
import { RdPu4 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";
import "chartjs-plugin-colorschemes"; 
import moment from "moment";

Chart.register(require("chartjs-plugin-colorschemes"));

const CustomeBarchart = () => {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    limit: 5000,
    timezone: "Indian/Cocos",
    timeDimensions: [
      {
        dimension: "data_entries.timestamp",
        granularity: "day",
      },
    ],
    measures: ["data_entries.totalValue"],
    dimensions: ["data_entries.id", "data_entries.value"],
  });

  if (isLoading) {
    return <div>{(progress && progress.stage && progress.stage.stage) || "Loading..."}</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return null;
  }

  const labels = resultSet
    .tablePivot()
    .map((row) => moment(row["data_entries.timestamp.day"]).format("YYYY-MM-DD"));

  const datasets = [
    {
      label: "Total Value", 
      data: resultSet
        .tablePivot()
        .map((row) => row["data_entries.totalValue"]),
      backgroundColor: "#8884d8", 
    },
  ];

  return (
    <Bar
      data={{
        labels,
        datasets,
      }}
      options={{
        responsive: true,
        plugins: {
          colorschemes: {
            scheme: RdPu4, 
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date", 
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Value", 
            },
          },
        },
        legend: {
          position: "bottom",
          align: "start",
        },
      }}
    />
  );
};

export default CustomeBarchart;
