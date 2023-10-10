const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  foodOptions: {
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    alcoholFree: Boolean,
    halal: Boolean,
    kosher: Boolean,
  },
  drivingStyle: {
    cautious: Boolean,
    normal: Boolean,
    aggressive: Boolean,
  },
});

module.exports = mongoose.model('Preferences', preferencesSchema);