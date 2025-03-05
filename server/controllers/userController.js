import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, department } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    department: role === 'teacher' ? department : undefined,
    status: 'active' // Admin-created users are automatically active
  });

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, department, status } = req.body;

  // Build update object
  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (role) updateFields.role = role;
  if (status) updateFields.status = status;
  
  // Only include department if role is teacher
  if (role === 'teacher' && department) {
    updateFields.department = department;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Update user status
// @route   PUT /api/users/:id/status
// @access  Private/Admin
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !['active', 'pending', 'suspended'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid status' });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});