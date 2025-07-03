import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, CategoryScale);

export default function RealTimeFlowChart() {
  const [flowData, setFlowData] = useState([]);

  const fetchFlowData = async () => {
    try {
      const response = await fetch('https://flowmeter.onrender.com/flow-data'); // your backend should return { timestamps: [], flowRates: [] }
      if (!response.ok) throw new Error('Failed to fetch flow data');
      const data = await response.json();
      setFlowData(data);
    } catch (err) {
      console.error('❌ Error fetching flow data:', err);
    }
  };

  useEffect(() => {
    fetchFlowData();
    const interval = setInterval(fetchFlowData, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    datasets: [
    {
      label: 'Flow Rate (m³/h)',
      data: flowData.points || [],  // directly use points
      fill: true,
      backgroundColor: 'rgba(30,136,229,0.2)',
      borderColor: '#1e88e5',
      pointBackgroundColor: '#1e88e5',
      tension: 0.4,
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
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
