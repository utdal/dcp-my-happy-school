import asyncHandler from '../../utils/asyncHandler.js';
import AuthService from '../../services/auth.service.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Validate user credentials
  const user = await AuthService.validateUser(email, password);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Only check status for parents
  if (user.role === 'parent' && user.status !== 'active') {
    return res.status(401).json({
      success: false,
      message: 'Your account is pending approval'
    });
  }

  // Update last login time
  await AuthService.updateLoginTime(user._id);

  // Generate token
  const token = AuthService.generateToken(user._id);

  // Get cookie options
  const options = AuthService.getCookieOptions();

  res.status(200)
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