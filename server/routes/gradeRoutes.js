import express from 'express';
import { 
  getGrades, 
  getGrade, 
  createGrade, 
  updateGrade, 
  deleteGrade,
  getGradeStats
} from '../controllers/gradeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Routes for all authenticated users
router.route('/')
  .get(getGrades);

router.route('/:id')
  .get(getGrade);

// Routes for teachers and admins
router.route('/')
  .post(authorize('teacher', 'admin'), createGrade);

router.route('/:id')
  .put(authorize('teacher', 'admin'), updateGrade)
  .delete(authorize('teacher', 'admin'), deleteGrade);

router.route('/stats')
  .get(authorize('teacher', 'admin'), getGradeStats);

export default router;