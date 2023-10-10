const express = require('express');
const router = express.Router();
const TrafficLight = require('../../models/TrafficLight'); 


router.post('/', async (req, res) => {
  try {
    const newTrafficLight = new TrafficLight({
      starting_location: req.body.starting_location,
      destination: req.body.destination,
    });

    await newTrafficLight.save();

    console.log('Data saved successfully:', newTrafficLight);

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

module.exports = router;
