import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  type: {
    type: String,
    enum: ['homework', 'quiz', 'test', 'project'],
    default: 'homework'
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date']
  },
  grade: {
    type: String,
    enum: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 
           'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 
           'Grade 11', 'Grade 12'],
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submissions: {
    type: Number,
    default: 0
  },
  totalStudents: {
    type: Number,
    required: true
  },
  graded: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Assignment', AssignmentSchema);