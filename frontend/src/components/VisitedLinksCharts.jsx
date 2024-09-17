import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all components (including scales)
Chart.register(...registerables);

const VisitedLinksChart = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map(link => link.url), // Use URLs as labels
    datasets: [
      {
        label: 'Visit Count',
        data: data.map(link => link.visitCount), // Use visit counts as data
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Visited Links Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default VisitedLinksChart;