import asyncHandler from '../../utils/asyncHandler.js';
import AuthService from '../../services/auth.service.js';
import User from '../../models/User.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }

  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Set initial status based on role
  // Teachers and admins are auto-approved, parents need approval
  const initialStatus = role === 'parent' ? 'pending' : 'active';

  // Create user
  const user = await AuthService.createUser({
    name,
    email,
    password,
    role,
    status: initialStatus
  });

  // Generate token
  const token = AuthService.generateToken(user._id);

  // Get cookie options
  const options = AuthService.getCookieOptions();

  res.status(201)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
});