import React, { useEffect, useState } from 'react';

export default function SmsTab() {
  const [smsData, setSmsData] = useState([]);
  const [searchSms, setSearchSms] = useState('');

  const canalDeviceMap = {
    "सांगोला": ["1", "2", "3", "4", "5"],
    "आटपाडी डावा": ["6", "7", "8", "9", "10"],
    "सांगली": ["11", "12", "13", "14", "15"],
  };


  const getCanalForDevice = (deviceId) => {
    for (const [canal, deviceList] of Object.entries(canalDeviceMap)) {
      if (deviceList.includes(deviceId)) {
        return canal;
      }
    }
    return 'अज्ञात';
  };




  const fetchAllSmsFromAPI = async () => {
    try {
      const response = await fetch('https://flowmeter.onrender.com/all-sms');
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      console.log(data);
      setSmsData(data);
    } catch (err) {
      console.error('Failed to fetch SMS:', err);
    }
  };

  useEffect(() => {
    fetchAllSmsFromAPI();
    const interval = setInterval(fetchAllSmsFromAPI, 300000);
    return () => clearInterval(interval);
  }, []);

  const filteredSms = smsData.filter((sms) => {
    const { deviceId, location } = sms.parsedFields || {};
    return (
      deviceId?.toLowerCase().includes(searchSms.toLowerCase()) ||
      location?.toLowerCase().includes(searchSms.toLowerCase())
    );
  });

  return (
    <div>
      <h2>पाणी प्रवाह मॉनिटरिंग</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="एसएमएस शोधा..."
          value={searchSms}
          onChange={(e) => setSearchSms(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>उपकरण ID</th>
            <th>विसर्ग (क्युसेक)</th>
            <th>घनफळ</th>
            <th>स्थान</th>
            <th>कालवा</th>
            <th>अंतिम अद्यतन</th>
          </tr>
        </thead>
        <tbody>
          {filteredSms.map((sms) => {
            const deviceId = sms.parsedFields?.device_id || '-';
            const canal = getCanalForDevice(deviceId);

            return (
              <tr key={sms.id}>
                <td>{deviceId}</td>
                <td>{sms.parsedFields?.discharge || '-'}</td>
                <td>{sms.parsedFields?.volume || '-'}</td>
                <td>{sms.parsedFields?.location || '-'}</td>
                <td>{canal}</td>
                <td>{sms.receivedAt ? new Date(sms.receivedAt).toLocaleString() : '-'}</td>
              </tr>
            );
          })}
          {smsData.length === 0 && (
            <tr>
              <td colSpan="6">डेटा लोड होत आहे...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
