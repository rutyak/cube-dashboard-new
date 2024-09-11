import React from "react";
import { useCubeQuery } from "@cubejs-client/react";
import { useTable } from "react-table";
import moment from "moment";
import {
  Box,
  Center,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const CustomeTableChart = () => {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    limit: 5000,
    timezone: "Indian/Cocos",
    dimensions: [
      "data_entries.name",
      "data_entries.value",
      "data_entries.id"
    ],
    measures: [
      "data_entries.totalValue"
    ],
    timeDimensions: [
      {
        dimension: "data_entries.timestamp",
        granularity: "month"
      }
    ]
  });

  const data = React.useMemo(() => {
    if (!resultSet) return [];
    return resultSet.tablePivot().map((row) => ({
      Month: moment(row["data_entries.timestamp.month"]).format("MMM YYYY"),
      TotalValue: row["data_entries.totalValue"]
    }));
  }, [resultSet]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Month",
        accessor: "Month"
      },
      {
        Header: "Total Value",
        accessor: "TotalValue"
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  if (isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner size="xl" />
        <Text ml={4}>Loading... {progress?.stage?.stage || ""}</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100%" w="100%">
        <Text color="red.500">Error: {error.toString()}</Text>
      </Center>
    );
  }

  if (!resultSet) {
    return null;
  }

  return (
    <Box
      borderWidth={1}
      borderRadius="md"
      overflow="hidden"
      bg="white"
      p={4}
      boxShadow="md"
      width="full"
      minW="400px"
    >
      <Table {...getTableProps()} variant="simple" size="sm">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CustomeTableChart;
