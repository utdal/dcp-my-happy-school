import Grade from '../models/Grade.js';
import Student from '../models/Student.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all grades
// @route   GET /api/grades
// @access  Private
export const getGrades = asyncHandler(async (req, res) => {
  const { studentId, subject, term } = req.query;
  let query = {};

  // Filter by student if provided
  if (studentId) {
    query.student = studentId;
  }

  // Filter by subject if provided
  if (subject) {
    query.subject = subject;
  }

  // Filter by term if provided
  if (term) {
    query.term = term;
  }

  // If user is parent, only show grades for their children
  if (req.user.role === 'parent') {
    // Get all students associated with this parent
    const students = await Student.find({ parents: req.user._id });
    const studentIds = students.map(student => student._id);
    
    // Add to query
    query.student = { $in: studentIds };
  }

  // If user is teacher, only show grades they've assigned
  if (req.user.role === 'teacher') {
    query.teacher = req.user._id;
  }

  const grades = await Grade.find(query)
    .populate('student', 'name grade')
    .populate('teacher', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: grades.length,
    data: grades
  });
});

// @desc    Get single grade
// @route   GET /api/grades/:id
// @access  Private
export const getGrade = asyncHandler(async (req, res) => {
  const grade = await Grade.findById(req.params.id)
    .populate('student', 'name grade')
    .populate('teacher', 'name');

  if (!grade) {
    return res.status(404).json({ success: false, message: 'Grade not found' });
  }

  // Check if user has access to this grade
  if (req.user.role === 'parent') {
    const student = await Student.findById(grade.student);
    if (!student.parents.includes(req.user._id)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this grade' 
      });
    }
  } else if (req.user.role === 'teacher' && grade.teacher.toString() !== req.user._id.toString()) {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to access this grade' 
    });
  }

  res.status(200).json({
    success: true,
    data: grade
  });
});

// @desc    Create new grade
// @route   POST /api/grades
// @access  Private/Teacher,Admin
export const createGrade = asyncHandler(async (req, res) => {
  // Add teacher to req.body
  req.body.teacher = req.user.id;

  // Check if student exists
  const student = await Student.findById(req.body.student);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const grade = await Grade.create(req.body);

  res.status(201).json({
    success: true,
    data: grade
  });
});

// @desc    Update grade
// @route   PUT /api/grades/:id
// @access  Private/Teacher,Admin
export const updateGrade = asyncHandler(async (req, res) => {
  let grade =
}
)