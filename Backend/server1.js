
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// ✅ Use Replit's assigned port or fallback
const PORT = process.env.PORT || 5000;

// Allow JSON body parsing
app.use(bodyParser.json());

// Allow CORS (important for web/API use)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// --- ROUTE TO RECEIVE SMS ---
app.post('/receive-sms', (req, res) => {
  const { sender, message, timestamp } = req.body;
  console.log(req.body)

  if (!sender || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(`\n📩 New SMS Received:`);
  console.log(`From     : ${sender}`);
  console.log(`Message  : ${message}`);
  console.log(`Timestamp: ${timestamp}`);

  res.status(200).json({ status: 'success', received: true });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ SMS Receiver running at public URL on port ${PORT}`);
});