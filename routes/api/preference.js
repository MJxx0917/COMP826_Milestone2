const express = require('express');
const router = express.Router();
const Preferences = require('../../models/Preference'); 

router.post('/', async (req, res) => {
  try {

    const { foodOptions, drivingStyle } = req.body;


    const newPreferences = new Preferences({
      foodOptions,
      drivingStyle,
    });


    const savedPreferences = await newPreferences.save();

    res.status(201).json({
      message: 'User preferences saved successfully',
      preferences: savedPreferences, 
    });
  } catch (error) {
    console.error('Error saving user preferences:', error);
    res.status(500).json({ error: 'An error occurred while saving user preferences' });
  }
});

module.exports = router;
