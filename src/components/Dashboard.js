import React from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import AreaChart from './AreaChart';


const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ flex: 1, margin: '0 10px' }}>
          <LineChart />
        </div>
        <div style={{ flex: 1, margin: '0 10px' }}>
          <BarChart />
        </div>
        <div style={{ flex: 1, margin: '0 10px' }}>
          <AreaChart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
