const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const User = require('./models/User');
const TrafficLight = require('./models/TrafficLight');
const Preference = require('./models/Preference');
const EmergencyLocation = require('./models/EmergencyLocation');
const TrafficLightSettings = require('./models/TrafficLightSettings');
const TrafficLightID = require('./models/TrafficLightID');

const app = express();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Connect to the MongoDB database
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));

app.post('/api/user', async (req, res) => {
  console.log('Received POST request:', req.body);
  try {
    const { username, password, email, role } = req.body;

    const newUser = new User({
      username,
      password,
      email,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'An error occurred while saving user data' });
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    console.log('Login route reached');
    const { username, password } = req.body;
    console.log('Received credentials:', username, password);

    const user = await User.findOne({ username });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!password) {
      console.log('Password is empty');
      return res.status(401).json({ error: 'Password is required' });
    }

    console.log('Stored hashed password:', user.password);

    let isPasswordValid;
     try {
           isPasswordValid = await user.comparePassword(password);
      } catch (error) {
        console.error('Error comparing password:', error);
        return res.status(500).json({ error: 'An error occurred during password comparison' });
      }
      console.log('Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/api/user/update-password', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.updatePassword(password);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'An error occurred while updating the password' });
  }
});

app.post('/api/trafficLight', async (req, res) => {
  console.log('Received POST request:', req.body);
  try {
    const { starting_location, destination } = req.body;

    if (!starting_location || !destination) {
      return res.status(400).json({ error: 'Both starting_location and destination are required.' });
    }

    const newTrafficLight = new TrafficLight({
      starting_location,
      destination,
    });

    await newTrafficLight.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

app.post('/api/preference', async (req, res) => {
  try {
    const { foodOptions, drivingStyle } = req.body;

    if (!foodOptions || !drivingStyle) {
      return res.status(400).json({ error: 'Both foodOptions and drivingStyle are required.' });
    }

    const newPreferences = new Preference({
      foodOptions,
      drivingStyle,
    });

    await newPreferences.save();

    res.status(201).json({ message: 'Preferences data saved successfully' });
  } catch (error) {
    console.error('Error saving Preferences data:', error);
    res.status(500).json({ error: 'An error occurred while saving Preferences data' });
  }
});

app.post('/api/emergencyLocation', async (req, res) => {
  console.log('Received POST request:', req.body);
  try {
    const { emergency_location } = req.body;

    if (!emergency_location) {
      return res.status(400).json({ error: 'emergency_location is required.' });
    }

    const newEmergencyLocation = new EmergencyLocation({
      emergency_location,
    });

    await newEmergencyLocation.save();

    res.status(201).json({ message: 'Emergency location data saved successfully' });
  } catch (error) {
    console.error('Error saving emergency location data:', error);
    res.status(500).json({ error: 'An error occurred while saving emergency location data' });
  }
});

app.post('/api/trafficLightSettings', async (req, res) => {
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

app.get('/api/trafficLightSettings', async (req, res) => {
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

app.post('/api/trafficLightSettings', async (req, res) => {
  try {
      const {trafficLightID} = req.body;

      const newTrafficLightID = new TrafficLightID({
          trafficLightID,
      });

      await newTrafficLightID.save();
      console.log('Traffic Light ID saved successfully:', newTrafficLightID);
      res.status(201).json({ message: 'Traffic Light ID saved successfully' });
  } catch (error) {
      console.error('Error saving Traffic Light ID:', error);
      res.status(500).json({ error: 'An error occurred while saving Traffic Light ID' });
  }
});

app.post('/api/trafficLightID', async (req, res) => {
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

app.get('/api/trafficLightID', async (req, res) => {
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

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
