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
import { Box } from "@chakra-ui/react";

const CustomeAreachart = () => {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    limit: 5000,
    timezone: "Indian/Cocos",
    dimensions: ["data_entries.name", "data_entries.value", "data_entries.id"],
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

  const dataSource = resultSet.tablePivot().map((row) => ({
    timestamp: moment(row["data_entries.timestamp.month"]).format("MMM YYYY"),
    totalValue: row["data_entries.totalValue"],
  }));

  return (
    <Box maxW="580px">
      <AreaChart
        width={580}
        height={300}
        data={dataSource}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tickItem) =>
            moment(tickItem, "MMM YYYY").format("MMM YYYY")
          }
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="totalValue"
          stroke="#8884d8"
          fillOpacity={0.3}
          fill="#8884d8"
        />
      </AreaChart>
    </Box>
  );
};

export default CustomeAreachart;
