import express from 'express';
import { 
  getAttendanceRecords, 
  getAttendanceRecord, 
  createAttendanceRecord, 
  updateAttendanceRecord, 
  deleteAttendanceRecord,
  getAttendanceStats
} from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Routes for all authenticated users
router.route('/')
  .get(getAttendanceRecords);

router.route('/:id')
  .get(getAttendanceRecord);

// Routes for teachers and admins
router.route('/')
  .post(authorize('teacher', 'admin'), createAttendanceRecord);

router.route('/:id')
  .put(authorize('teacher', 'admin'), updateAttendanceRecord)
  .delete(authorize('teacher', 'admin'), deleteAttendanceRecord);

router.route('/stats')
  .get(authorize('teacher', 'admin'), getAttendanceStats);

export default router;