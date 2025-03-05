import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  grade: {
    type: String,
    required: [true, 'Please add a grade'],
    enum: [
      'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 
      'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 
      'Grade 11', 'Grade 12'
    ]
  },
  enrollmentDate: {
    type: Date,
    required: [true, 'Please add an enrollment date'],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'withdrawn', 'pending'],
    default: 'active'
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Student', StudentSchema);