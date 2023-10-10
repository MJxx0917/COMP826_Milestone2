const mongoose = require('mongoose');

const emergencyLocationSchema = new mongoose.Schema({
    emergency_location:
    {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('EmergencyLocation', emergencyLocationSchema);