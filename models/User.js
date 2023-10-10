const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    username:
    {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'trafficManager'],
        default: 'user',
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log('Hashed password before saving:', hashedPassword);
        user.password = hashedPassword;
        next();
      } catch (error) {
        return next(error);
      }
    } else {
      return next();
    }
  });
  
  /*
  userSchema.methods.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error; 
    }
  };
  */

 
  userSchema.methods.comparePassword = async function (password) {
    try {
      console.log('comparePassword method invoked');
      console.log('Stored hashed password:', this.password);
      const isPasswordValid = await bcrypt.compare(password, this.password);
      console.log('Password comparison result:', isPasswordValid);
      return isPasswordValid;
    } catch (error) {
      throw error;
    }
  };

  userSchema.methods.updatePassword = async function (newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      this.password = hashedPassword;
      await this.save();
      console.log('Password updated successfully:', this);
      return true;
    } catch (error) {
      throw error;
    }
  };

  /*
  userSchema.methods.updatePassword = async function (newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      this.password = hashedPassword;
      await this.save();
      return true;
    } catch (error) {
      throw error;
    }
  };
  */
  
module.exports = mongoose.model('User', userSchema);