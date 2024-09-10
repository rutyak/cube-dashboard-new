import React from "react";
import { useCubeQuery } from "@cubejs-client/react";
import { useTable } from "react-table";
import moment from "moment";

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

  return (
    <table {...getTableProps()} style={{ width: '100%', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomeTableChart;
