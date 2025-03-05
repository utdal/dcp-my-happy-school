import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    maxlength: [5000, 'Content cannot be more than 5000 characters']
  },
  priority: {
    type: String,
    enum: ['urgent', 'general', 'staff'],
    default: 'general'
  },
  audience: {
    type: String,
    required: [true, 'Please specify the audience']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Announcement', AnnouncementSchema);