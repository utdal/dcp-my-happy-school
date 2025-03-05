import express from 'express';
import { 
  getMessages, 
  getMessage, 
  createMessage, 
  updateMessage, 
  deleteMessage,
  getUnreadCount
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMessages)
  .post(createMessage);

router.route('/:id')
  .get(getMessage)
  .put(updateMessage)
  .delete(deleteMessage);

router.route('/unread')
  .get(getUnreadCount);

export default router;