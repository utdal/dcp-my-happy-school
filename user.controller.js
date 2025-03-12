import asyncHandler from '../../utils/asyncHandler.js';
import User from '../../models/User.js';

export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Successfully logged out'
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate('students')
    .populate('classes');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      students: user.students,
      classes: user.classes,
      lastLogin: user.lastLogin
    }
  });
});

export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  res.status(200).json({
    success: true,
    exists: !!user
  });
});

export const approveUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  if (user.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Can only approve pending users'
    });
  }

  user.status = 'active';
  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
});

export const rejectUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  if (user.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Can only reject pending users'
    });
  }

  user.status = 'rejected';
  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
});