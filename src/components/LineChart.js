import React, { useEffect, useState } from 'react';
import cubejsApi from '../cubeApi';
import { Line } from 'react-chartjs-2';
import Filter from './Filter';

const LineChart = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cubejsApi.load({
          measures: ['DataEntries.totalValue'],
          dimensions: ['DataEntries.timestamp'],
          filters: [
            ...(filters.name ? [{ dimension: 'DataEntries.name', operator: 'equals', values: [filters.name] }] : []),
            ...(filters.startDate && filters.endDate ? [{ dimension: 'DataEntries.timestamp', operator: 'inDateRange', values: [filters.startDate, filters.endDate] }] : []),
          ],
        });
        setData(response.loadResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div>
      <Filter onFilterChange={setFilters} />
      <Line
        data={{
          labels: data.map(d => d.timestamp),
          datasets: [
            {
              label: 'Value Over Time',
              data: data.map(d => d.value),
              borderColor: 'rgba(75, 192, 192, 0.2)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default LineChart;
