import React, { useEffect, useState } from 'react';


export default function SwfTab() {
  const [swfData, setSwfData]       = useState([]);
  const [activeDevice, setActiveDevice] = useState('S1');


  const deviceLabels = {
    S1: 'सांगली',
    S2: 'सांगोला',
    S3: 'आटपाडी',
  };


  const fetchSWFData = async () => {
    try {
      const res = await fetch('http://localhost:5000/all-swf');
      if (!res.ok) throw new Error('API error');
      const payload = await res.json();
      const list = Array.isArray(payload) ? payload
                   : Array.isArray(payload.allSwf) ? payload.allSwf
                   : [];
      setSwfData(list);
    } catch (err) {
      console.error('डेटा मिळवताना त्रुटी:', err);
    }
  };


  useEffect(() => {
    fetchSWFData();
    const iv = setInterval(fetchSWFData, 300_000);
    return () => clearInterval(iv);
  }, []);


  const parseMessage = (msg) => {
    const dischargeMatch = msg.match(/Discharge\s*[:\-]?\s*(\d+)/i);
    const deviceMatch    = msg.match(/Device\s*id\s*[:\-]?\s*(S[123])/i);
    const locationMatch  = msg.match(/Location\s*[:\-]?\s*([A-Za-z]+)/i);


    return {
      discharge: dischargeMatch  ? dischargeMatch[1] : '-',
      deviceId:  deviceMatch     ? deviceMatch[1]    : '-',
      location:  locationMatch   ? locationMatch[1]  : '-',
    };
  };


  const filteredData = (swfData || [])
    .map(swf => ({ ...swf, parsedFields: parseMessage(swf.message || '') }))
    .filter(swf => swf.parsedFields.deviceId === activeDevice);


  return (
    <div className="p-4">
      <h2>💧 SWF पाण्याचा डेटा</h2>


      <div style={{ margin: '20px 0' }}>
        {Object.entries(deviceLabels).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveDevice(id)}
            style={{
              marginRight: 10,
              padding: '8px 16px',
              backgroundColor: activeDevice === id ? '#1976d2' : '#e0e0e0',
              color: activeDevice === id ? 'white' : 'black',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>


      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>उपकरण ID</th>
            <th>विसर्ग (LPS)</th>
            <th>स्थान</th>
            <th>वेळ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(swf => (
              <tr key={swf._id}>
                <td>{swf.parsedFields.deviceId}</td>
                <td>{swf.parsedFields.discharge}</td>
                <td>{swf.parsedFields.location}</td>
                <td>{new Date(swf.receivedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">डेटा लोड होत आहे किंवा उपलब्ध नाही...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
