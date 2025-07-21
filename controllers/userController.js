const User = require('../models/User');
const Link = require('../models/Link');

const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username, isActive: true }).select('-password -email');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const links = await Link.find({ 
      userId: user._id, 
      isActive: true 
    }).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      user: user.toPublicJSON(),
      links
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, theme, avatar } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (theme && ['light', 'dark', 'colorful'].includes(theme)) updateData.theme = theme;
    if (avatar !== undefined) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

const updateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    
    if (!username || username.length < 3 || username.length > 30) {
      return res.status(400).json({
        success: false,
        message: 'Username must be between 3 and 30 characters'
      });
    }

    const existingUser = await User.findOne({ 
      username: username.toLowerCase(), 
      _id: { $ne: req.user._id } 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username: username.toLowerCase() },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Username updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  updateUsername
};