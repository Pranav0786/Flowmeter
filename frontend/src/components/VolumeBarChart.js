
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, TimeScale, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(TimeScale, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale);

export default function RealTimeFlowChart() {
  const [flowData, setFlowData] = useState([]);

  const fetchFlowData = async () => {
    try {
      const response = await fetch('http://localhost:5000/flow-data');
      if (!response.ok) throw new Error('Failed to fetch flow data');
      const data = await response.json();
      setFlowData(data);
    } catch (err) {
      console.error('❌ Error fetching flow data:', err);
    }
  };

  useEffect(() => {
    fetchFlowData();
    const interval = setInterval(fetchFlowData, 10000); 
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    datasets: [
      {
        label: 'Flow Rate (m³/h)',
        data: flowData.points || [],
        backgroundColor: 'rgba(30,136,229,0.6)',
        borderColor: '#1e88e5',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'प्रवाह दराचा आढावा',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'HH:mm',
          unit: 'hour',
          displayFormats: { hour: 'HH:mm' },
        },
        title: { display: true, text: 'Time' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Flow Rate (m³/h)' },
      },
    },
  };

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', marginTop: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
