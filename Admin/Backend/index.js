import { register } from './register.controller.js';
import { login } from './login.controller.js';
import { logout, getMe, checkEmail, approveUser, rejectUser } from './user.controller.js';

export {
  register,
  login,
  logout,
  getMe,
  checkEmail,
  approveUser,
  rejectUser
};