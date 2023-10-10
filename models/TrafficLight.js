const mongoose = require('mongoose');

const trafficLightSchema = new mongoose.Schema({
  starting_location:
  {
    type: String,
    required: true
  },
  destination:
  {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('TrafficLight', trafficLightSchema);