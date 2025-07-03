require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SMS = require('./model/SMS');
const VolumeCounter = require('./model/VolumeCounter');

const app = express();

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB once when the server starts
mongoose.connect(MONGO_URI, {})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});





// --- ROUTE TO RECEIVE SMS ---
app.post('/receive-sms', async (req, res) => {
  console.log('\n🔎 Raw request body:', req.body);

  const {
    package: pkg,
    title,
    message,
    ticker_text,
    timestamp,
    category,
  } = req.body;

  // Validate required fields
  if (!title || !message || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Parse timestamp as number → Date
  let ts = Number(timestamp);
  if (isNaN(ts)) ts = Date.now();
  const date = new Date(ts * 1000);

  const smsData = {
    sender: title,
    message: String(message),
    receivedAt: date,
    metadata: {
      package: pkg,
      ticker: ticker_text,
      category,
    }
  };

  console.log('📩 Parsed SMS to store:', smsData);

  // ⬇️ Extract volume from the message string
  let parsedVolume = 0;
  const volumeMatch = message.match(/Volume\s*[-:]?\s*(\d+)/i);
  if (volumeMatch && volumeMatch[1]) {
    parsedVolume = parseInt(volumeMatch[1], 10);
    console.log(`🔢 Parsed volume: ${parsedVolume}`);
  } else {
    console.log('⚠️ Volume not found in message. Skipping volume accumulation.');
  }

  try {
    const savedSMS = await SMS.create(smsData);
    console.log('✅ SMS saved to MongoDB with _id:', savedSMS._id);

    // ⬇️ Update cumulative volume
    if (parsedVolume > 0) {
      const updatedCounter = await VolumeCounter.findOneAndUpdate(
        {},
        { $inc: { totalVolume: parsedVolume } },
        { upsert: true, new: true }
      );
      console.log('📈 Updated total volume:', updatedCounter.totalVolume);
    }

    res.status(200).json({ status: 'success', received: true, id: savedSMS._id });
  } catch (err) {
    console.error('❌ Error saving SMS:', err);
    res.status(500).json({ status: 'error', message: 'Failed to save SMS' });
  }
});


app.get('/latest-sms', async (req, res) => {
  try {
    // Fetch the latest SMS document (sorted by creation time)
    const latestSMS = await SMS.findOne().sort({ createdAt: -1 });

    if (!latestSMS) {
      return res.status(404).json({ error: 'No SMS messages found' });
    }

    // Parse key-value pairs from the message
    const fields = {};
    const lines = latestSMS.message.split('\n');
    lines.forEach(line => {
      const [keyRaw, valueRaw] = line.split('-');
      if (keyRaw && valueRaw) {
        const key = keyRaw.trim().toLowerCase().replace(/\s+/g, '_');
        const value = valueRaw.trim();
        fields[key] = value;
      }
    });

    return res.status(200).json({
      id: latestSMS._id,
      sender: latestSMS.sender,
      receivedAt: latestSMS.receivedAt,
      parsedFields: fields
    });
  } catch (err) {
    console.error('❌ Error retrieving latest SMS:', err);
    res.status(500).json({ error: 'Failed to retrieve latest SMS' });
  }
});



app.get('/all-sms', async (req, res) => {
  try {
    // Fetch all SMS documents, sorted from newest to oldest
    const allSMS = await SMS.find().sort({ createdAt: -1 });

    if (!allSMS || allSMS.length === 0) {
      return res.status(404).json({ error: 'No SMS messages found' });
    }

    // Map each SMS to include parsed fields
    const result = allSMS.map(sms => {
      const fields = {};
      const lines = sms.message.split('\n');
      lines.forEach(line => {
        const [keyRaw, valueRaw] = line.split('-');
        if (keyRaw && valueRaw) {
          const key = keyRaw.trim().toLowerCase().replace(/\s+/g, '_');
          const value = valueRaw.trim();
          fields[key] = value;
        }
      });

      return {
        id: sms._id,
        sender: sms.sender,
        receivedAt: sms.receivedAt,
        parsedFields: fields
      };
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('❌ Error retrieving all SMS messages:', err);
    res.status(500).json({ error: 'Failed to retrieve SMS messages' });
  }
});



app.get('/total-volume', async (req, res) => {
  const counter = await VolumeCounter.findOne();
  const total = counter ? counter.totalVolume : 0;
  res.json({ totalVolume: total });
});


app.get('/flow-data', async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h ago
    const smsRecords = await SMS.find().sort({ receivedAt: 1 });

    const points = [];

    smsRecords.forEach(sms => {
      const dischargeMatch = sms.message.match(/Discharge\s*-\s*(\d+)/i);
      const discharge = dischargeMatch ? Number(dischargeMatch[1]) : null;

      if (discharge !== null && !isNaN(discharge)) {
        points.push({
          x: sms.receivedAt.toISOString(),  // ISO timestamp
          y: discharge                      // discharge value
        });
      }
    });

    console.log('📊 Flow data points:', points);
    res.json({ points });
  } catch (err) {
    console.error('❌ Error building flow data:', err);
    res.status(500).json({ error: 'Failed to fetch flow data' });
  }
});




// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ SMS Receiver running at public URL on port ${PORT}`);
});
