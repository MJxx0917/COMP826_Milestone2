const mongoose = require('mongoose');

const trafficLightIDSchema = new mongoose.Schema({
    trafficLightID: {
      type: Number,
      required: true,
    },
});

module.exports = mongoose.model('TrafficLightID', trafficLightIDSchema);