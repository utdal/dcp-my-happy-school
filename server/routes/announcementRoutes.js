import express from 'express';
import { 
  getAnnouncements, 
  getAnnouncement, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAnnouncements)
  .post(authorize('admin'), createAnnouncement);

router.route('/:id')
  .get(getAnnouncement)
  .put(authorize('admin'), updateAnnouncement)
  .delete(authorize('admin'), deleteAnnouncement);

export default router;