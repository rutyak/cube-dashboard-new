import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import cubejsApi from '../cubeApi';
import Filter from './Filter'; 

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const resultSet = await cubejsApi.load({
          measures: ['data_entries.totalValue'],
          dimensions: ['data_entries.name'],
          filters: [
            ...(filters.name ? [{ dimension: 'data_entries.name', operator: 'equals', values: [filters.name] }] : []),
            ...(filters.startDate && filters.endDate ? [{ dimension: 'data_entries.timestamp', operator: 'inDateRange', values: [filters.startDate, filters.endDate] }] : []),
          ],
        });

        const data = {
          labels: resultSet.categories().map(c => c.category),
          datasets: [{
            label: 'Value Distribution by Name',
            data: resultSet.series()[0]?.series.map(s => s.value) || [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }],
        };

        setChartData(data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div>
      <Filter onFilterChange={setFilters} /> 
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {chartData ? <Bar data={chartData} options={{ responsive: true }} /> : !loading && !error && <p>No data available</p>}
    </div>
  );
};

export default BarChart;
