import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Filler } from 'chart.js';
import cubejsApi from '../cubeApi';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Filler);

const AreaChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const resultSet = await cubejsApi.load({
          measures: ['DataEntries.totalValue'],
          timeDimensions: [{
            dimension: 'DataEntries.timestamp',
            granularity: 'day',
          }],
        });

        const data = {
          labels: resultSet.categories().map(c => c.category),
          datasets: [{
            label: 'Total Value Over Time',
            data: resultSet.series()[0]?.series.map(s => s.value) || [],
            fill: true,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
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
  }, []);

  useEffect(() => {
    if (chartData) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("chartArea").getContext("2d");
      chartRef.current = new ChartJS(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div style={{ position: 'relative', height: '400px' }}> 
      <canvas id="chartArea"></canvas>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !chartData && <p>No data available</p>}
    </div>
  );
};

export default AreaChart;
