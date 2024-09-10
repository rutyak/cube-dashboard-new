import React from "react";
import { useCubeQuery } from "@cubejs-client/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const CustomeLinechart = () => {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    limit: 5000,
    timezone: "Indian/Cocos",
    dimensions: ["data_entries.id", "data_entries.value"],
    measures: ["data_entries.totalValue"],
    timeDimensions: [
      {
        dimension: "data_entries.timestamp",
        granularity: "month",
      },
    ],
  });

  if (isLoading) {
    return (
      <div>
        {(progress && progress.stage && progress.stage.stage) || "Loading..."}
      </div>
    );
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return null;
  }

  const dataSource = resultSet.tablePivot();

  return (
    <LineChart
      width={600}
      height={300}
      data={dataSource}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis
        dataKey="data_entries.timestamp.month"
        tickFormatter={(tickItem) => moment(tickItem).format("MMM YYYY")}
      />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="data_entries.totalValue"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default CustomeLinechart;
