import React, { useState } from 'react';

export default function Canals() {
  const canalDeviceMap = {
    सांगोला: ["1", "2", "3", "4", "5"],
    "आटपाडी डावा": ["6", "7", "8", "9", "10"],
    सांगली: ["11", "12", "13", "14", "15"],
  };

  const activeDevices = ["1", "3", "6", "8", "11", "15"];
  const isActive = (deviceId) => activeDevices.includes(deviceId);

  const [openCanal, setOpenCanal] = useState(null);

  const toggleCanal = (canal) => {
    setOpenCanal(openCanal === canal ? null : canal);
  };

  return (
    <div className="canals-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '5px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px', color: '#333' }}>कालवे</h2>
      {Object.entries(canalDeviceMap).map(([canal, devices]) => (
        <div key={canal} className="canal-section" style={{ marginBottom: '5px' }}>
          <div
            onClick={() => toggleCanal(canal)}
            style={{
              background: '#e0e0e0',
              color: '#222',
              padding: '8px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#d5d5d5'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#e0e0e0'}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{canal}</h3>
          </div>
          {openCanal === canal && (
            <ul
              style={{
                listStyle: 'none',
                padding: '5px 10px',
                margin: 0,
                background: '#f9f9f9',
                borderRadius: '0 0 5px 5px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {devices.map((deviceId) => (
                <li
                  key={deviceId}
                  style={{
                    padding: '4px 8px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    color: '#fff',
                    backgroundColor: isActive(deviceId) ? '#4caf50' : '#f44336',
                    fontSize: '0.85rem',
                  }}
                >
                  उपकरण {deviceId} - {isActive(deviceId) ? 'सक्रिय' : 'असक्रिय'}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
