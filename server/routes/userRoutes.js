import express from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
  updateUserStatus
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id/status')
  .put(updateUserStatus);

export default router;