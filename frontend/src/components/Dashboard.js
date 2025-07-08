import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import VolumeBarChart from './VolumeBarChart';


export default function Dashboard() {
  const totalDevices = 15;
  const activeDevices = 10;

  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const fetchVolume = async () => {
      try {
        const response = await fetch('http://localhost:5000/total-volume');
        if (!response.ok) throw new Error('Failed to fetch volume');
        const data = await response.json();
        setVolume(data.totalVolume);
      } catch (err) {
        console.error('❌ Error fetching volume:', err);
      }
    };

    fetchVolume();
    const interval = setInterval(fetchVolume, 5 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>जल व्यवस्थापन डॅशबोर्ड</h1>
          <p>{new Date().toLocaleString()}</p>
        </header>

        <section className="dashboard-cards">
          <div className="dashboard-card">
            <h3>एकूण उपकरणे</h3>
            <p>{totalDevices}</p>
          </div>
          <div className="dashboard-card active">
            <h3>सक्रिय उपकरणे</h3>
            <p>{activeDevices}</p>
          </div>
          <div className="dashboard-card inactive">
            <h3>एकूण घनफळ</h3>
            <p>{volume} घन मीटर</p>
          </div>
        </section>

        <VolumeBarChart />

      </main>
    </div>
  );
}
