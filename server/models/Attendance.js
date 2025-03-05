import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    required: [true, 'Please add attendance status']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  recordedBy: {
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

// Prevent duplicate attendance records for the same student on the same day
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);