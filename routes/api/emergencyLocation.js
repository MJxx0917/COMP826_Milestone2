const express = require('express');
const router = express.Router();
const EmergencyLocation = require('../../models/EmergencyLocation');

router.post('/',async (req, res) => {
   try {
    const newEmergencyLocation = new EmergencyLocation({
        emergency_location: req.body.emergency_location,
    });

    await newEmergencyLocation.save();

    console.log('Data saved successfully:', newEmergencyLocation);

    res.status(201).json({ message: 'Data saved successfully' });
   } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
   } 
});

module.exports = router;
  