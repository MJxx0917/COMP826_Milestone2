const mongoose = require('mongoose');

const trafficLightSettingsSchema = new mongoose.Schema({
  intervalTime: {
    type: Number,
    required: true,
  },
  initialColor: {
    type: String,
    enum: ['red', 'yellow', 'green'],
    required: true,
  },
});

const TrafficLightSettings = mongoose.model('TrafficLightSettings', trafficLightSettingsSchema);

module.exports = TrafficLightSettings;