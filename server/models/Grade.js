import mongoose from 'mongoose';

const GradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true
  },
  assignment: {
    type: String,
    required: [true, 'Please add an assignment name'],
    trim: true
  },
  score: {
    type: Number,
    required: [true, 'Please add a score'],
    min: [0, 'Score cannot be less than 0'],
    max: [100, 'Score cannot be more than 100']
  },
  letterGrade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'],
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  term: {
    type: String,
    required: [true, 'Please add a term'],
    enum: ['Fall 2024', 'Spring 2025', 'Summer 2025']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate letter grade based on score
GradeSchema.pre('save', function(next) {
  const score = this.score;
  
  if (score >= 97) this.letterGrade = 'A+';
  else if (score >= 93) this.letterGrade = 'A';
  else if (score >= 90) this.letterGrade = 'A-';
  else if (score >= 87) this.letterGrade = 'B+';
  else if (score >= 83) this.letterGrade = 'B';
  else if (score >= 80) this.letterGrade = 'B-';
  else if (score >= 77) this.letterGrade = 'C+';
  else if (score >= 73) this.letterGrade = 'C';
  else if (score >= 70) this.letterGrade = 'C-';
  else if (score >= 67) this.letterGrade = 'D+';
  else if (score >= 63) this.letterGrade = 'D';
  else if (score >= 60) this.letterGrade = 'D-';
  else this.letterGrade = 'F';
  
  next();
});

export default mongoose.model('Grade', GradeSchema);