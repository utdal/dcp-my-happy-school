import express from 'express';
import { 
  getStudents, 
  getStudent, 
  createStudent, 
  updateStudent, 
  deleteStudent,
  getEnrollmentStats
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Public routes for all authenticated users
router.route('/')
  .get(getStudents);

router.route('/:id')
  .get(getStudent);

// Admin only routes
router.use(authorize('admin'));

router.route('/')
  .post(createStudent);

router.route('/:id')
  .put(updateStudent)
  .delete(deleteStudent);

router.route('/stats/enrollment')
  .get(getEnrollmentStats);

export default router;