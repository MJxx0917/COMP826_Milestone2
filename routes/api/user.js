const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/register', async (req,res) => {
  try {
        const {username, password, email, role} = req.body;

        const newUser = new User({
            username,
            password,
            email,
            role,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User saved successfully',
            user: savedUser,
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'An error occurred while saving user' });
    }
});

router.post('/login', async (req, res) => {
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

    console.log('Login successful');
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

router.post('/update-password', async (req, res) => {
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

module.exports = router;