const mongoose = require('mongoose');

const volumeCounterSchema = new mongoose.Schema({
  totalVolume: {
    type: Number,
    required: true,
    default: 0,
  }
});

module.exports = mongoose.model('VolumeCounter', volumeCounterSchema);
