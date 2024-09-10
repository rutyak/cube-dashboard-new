import React from "react";
import { useCubeQuery } from "@cubejs-client/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const CustomeAreachart = () => {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["data_entries.totalValue"],
    dimensions: ["data_entries.id", "data_entries.value"],
    timeDimensions: [
      {
        dimension: "data_entries.timestamp",
        granularity: "month",
      },
    ],
    limit: 5000,
    timezone: "Indian/Cocos",
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
    <AreaChart
      width={600}
      height={300}
      data={dataSource}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="data_entries.timestamp.month"
        tickFormatter={(tickItem) => moment(tickItem).format("MMM YYYY")}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="data_entries.totalValue"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.3}
      />
    </AreaChart>
  );
};

export default CustomeAreachart;
