const express = require('express');
const router = express.Router();
const TrafficLightSettings = require('../../models/TrafficLightSettings'); 

router.post('/', async (req, res) => {
  try {
    const { intervalTime, initialColor } = req.body;

    const newSettings = new TrafficLightSettings({
      intervalTime,
      initialColor,
    });

    await newSettings.save();

    console.log('Settings saved successfully:', newSettings);

    res.status(201).json({ message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ error: 'An error occurred while saving settings' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allSettings = await TrafficLightSettings.find({}).lean();

    const sortedSettings = allSettings.sort((a, b) => b.createdAt - a.createdAt);

    const latestSetting = sortedSettings[0];

    const response = latestSetting || { intervalTime: 5000, initialColor: 'red' };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'An error occurred while fetching settings' });
  }
});

module.exports = router;
