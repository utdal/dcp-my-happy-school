import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true,
    maxlength: [100, 'Subject cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    maxlength: [5000, 'Content cannot be more than 5000 characters']
  },
  read: {
    type: Boolean,
    default: false
  },
  starred: {
    type: Boolean,
    default: false
  },
  regarding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Message', MessageSchema);