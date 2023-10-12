const express = require('express');
const router = express.Router();
const TrafficLightID = require('../../models/TrafficLightID');

router.post('/', async (req, res) => {
    try {
        const { trafficLightID } = req.body;

        const numericID = typeof trafficLightID === 'string' ? parseInt(trafficLightID, 10) : trafficLightID;

        const newTrafficLightID = new TrafficLightID({
            trafficLightID: numericID,
        });

        await newTrafficLightID.save();
        console.log('Traffic Light ID saved successfully:', newTrafficLightID);
        res.status(201).json({ message: 'Traffic Light ID saved successfully' });
    } catch (error) {
        console.error('Error saving Traffic Light ID:', error);
        res.status(500).json({ error: 'An error occurred while saving Traffic Light ID' });
    }
});

router.get('/', async (req, res) => {
    try {
        const latestTrafficLight = await TrafficLightID.findOne({}, {}, { sort: { 'trafficLightID': -1 } });

        if (!latestTrafficLight) {
            return res.status(404).json({ error: 'No traffic light records found' });
        }

        const latestNumericID = latestTrafficLight.trafficLightID;
        res.json({ latestID: latestNumericID });
    } catch (error) {
        console.error('Error fetching latest Traffic Light ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching latest Traffic Light ID' });
    }
});

module.exports = router;